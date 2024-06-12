const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const mysql = require("mysql2/promise")

const {
  JWT_SECRET,
  DB_HOST,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT
} = process.env;

const API_PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());

// CORS configuration
const allowedOrigins = ["http://localhost:3000", "https://field-ex.vercel.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

let connector = null;


const initMySQL = async () => {
  try {
    connector = await mysql.createConnection(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    console.log('MySQL connection established');
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
};

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success" });
});

app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const userData = { email, password: passwordHash, role: 'user' };

    await connector.query('INSERT INTO FieldEx.users SET ?', [userData]);
    res.json({ message: "Register Success" });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: "Register failed", error });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [results] = await connector.query('SELECT * FROM FieldEx.users WHERE email = ?', email);

    if (results.length === 0) {
      return res.status(400).json({ message: "Login Failed (Incorrect Email or Password)" });
    }

    const userData = results[0];
    const match = await bcrypt.compare(password, userData.password);

    if (!match) {
      return res.status(400).json({ message: "Login Failed (Incorrect Email or Password)" });
    }

    const token = jwt.sign({ email, role: userData.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Login successful!", token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: "Login failed", error });
  }
});

app.get('/api/logout', (req, res) => {
  return res.json({
    Status: "Logout Success"
  });
});

app.get('/api/users', verifyUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const results = await connector.query('SELECT * FROM FieldEx.users');
    res.json(results);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: "Failed to retrieve users", error });
  }
});


app.get('/api/usersData', verifyUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: "Access denied"
    });
  }
  try {
    const [results] = await connector.query('SELECT institutionID, institutionName FROM FieldEx.institution')
    res.json(results);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      message: "Failed to retrieve users",
      error
    })
  }
});


app.get('/api/fetchforms', verifyUser, async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({
        message: "Unauthorized: User information is missing"
      });
    }

    // Query to find institution ID from email
    const userResults = await connector.query('SELECT institutionID FROM FieldEx.users WHERE email = ?', [req.user.email]);

    if (userResults.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const institutionID = userResults[0].institutionID;

    // Query to find form data from institution ID
    const [formResults] = await connector.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', institutionID);

    if (formResults.length === 0) {
      return res.status(404).json({
        message: "No forms found for the given institution"
      });
    }

    res.json(formResults);
  } catch (error) {
    console.error('Error retrieving forms:', error);
    res.status(500).json({
      message: "Failed to retrieve forms",
      error: error.message
    });
  }
});


app.post('/api/submitge', async (req, res) => {
  const {
    institutionID, institutionName, telephone, fax, email, subdistrict, district, province,
    affiliation, headmasterName, projectDetail, educationLevels, studentCounts, teacherCounts,
    otherEducationLevel, otherStudentCount, otherTeacherCount
  } = req.body;

  try {
    const formData = {
      institutionID, institutionName, telephone, fax, email, subdistrict, district, province,
      affiliation, headmasterName, projectDetail
    };

    // Insert into institution table
    await connector.query('INSERT INTO FieldEx.institution SET ?', formData);

    // Prepare data for educationLevels table
    // Prepare data for educationLevels table
    const educationLevelsValues = educationLevels
      .filter(level => level !== 'อื่น ๆ') // Filter out "อื่น ๆ" from educationLevels
      .map(level => [
        institutionID, level, studentCounts[level], teacherCounts[level]
      ]);

    // Insert transformed education levels data into educationLevels table
    for (const eduLevel of educationLevelsValues) {
      await connector.query('INSERT INTO FieldEx.educationLevels (institutionID, educationLevel, studentCount, teacherCount) VALUES (?, ?, ?, ?)', eduLevel);
    }


    // Insert other education levels
    const otherLevels = { institutionID, otherEducationLevel, otherStudentCount, otherTeacherCount };
    await connector.query('INSERT INTO FieldEx.otherEducationLevels SET ?', otherLevels);

    res.status(200).json({
      message: "Submit Success"
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: "Submit failed",
      error: error.message
    });
  }
});

app.listen(API_PORT, () => {
  initMySQL();
  console.log("https://fieldex-production.up.railway.app");
});