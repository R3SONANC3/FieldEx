const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const MySQLConnector = require("./MySQLConnector");

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
    connector = new MySQLConnector(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    await connector.connect();
  } catch (error) {
    process.exit(1); // Exit process if connection fails
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

    await connector.insert('FieldEx.users', userData);
    res.json({ message: "Register Success" });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: "Register failed", error });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const results = await connector.query('SELECT * FROM FieldEx.users WHERE email = ?', [email]);

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
    const formResults = await connector.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', [institutionID]);

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



app.get('/api/fetchGeForm', verifyUser, async (req, res) => {
  try {
    // Query เพื่อค้นหารหัสสถานศึกษาที่เกี่ยวข้องกับอีเมลของผู้ใช้
    const [userResults] = await connector.query('SELECT institutionID FROM FieldEx.users WHERE email = ?', [req.user.email]);

    if (userResults.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const institutionID = userResults[0].institutionID;

    // Query เพื่อดึงข้อมูลแบบฟอร์มจากตาราง 'otherEducationLevels' โดยอิงจาก institutionID
    const [otherEducationResults] = await connector.query('SELECT * FROM otherEducationLevels WHERE institutionID = ?', [institutionID]);

    // Query เพื่อดึงข้อมูลแบบฟอร์มจากตาราง 'educationLevels' โดยอิงจาก institutionID
    const [educationResults] = await connector.query('SELECT * FROM educationLevels WHERE institutionID = ?', [institutionID]);

    // Query เพื่อดึงข้อมูลของสถานศึกษาจากตาราง 'FieldEx.institution' โดยอิงจาก institutionID
    const [institution] = await connector.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', [institutionID]);

    // ส่งข้อมูลสถานศึกษาและข้อมูลแบบฟอร์มกลับไป
    res.json({
      institution: institution[0],
      otherEducationLevels: otherEducationResults,
      educationLevels: educationResults
    });
  } catch (error) {
    console.error('Error retrieving forms:', error);
    res.status(500).json({
      message: "Failed to retrieve forms",
      error
    });
  }
});

app.post('/api/submitge', verifyUser, async (req, res) => {
  const {
    institutionID, institutionName, telephone, fax, email, subdistrict, district, province,
    affiliation, headmasterName, projectDetail, educationLevels, studentCounts, teacherCounts,
    otherEducationLevel, userEmail, otherStudentCount, otherTeacherCount
  } = req.body;

  try {
    const formData = {
      institutionID, institutionName, telephone, fax, email, subdistrict, district, province,
      affiliation, headmasterName, projectDetail
    };

    // Update user's institutionID based on userEmail
    await new Promise((resolve, reject) => {
      connector.query('UPDATE `users` SET `institutionID` = ? WHERE `email` = ?', [institutionID, userEmail], (err, result) => {
        if (err) {
          console.error("Error updating user's institutionID:", err);
          reject(err);
        } else {
          console.log("User's institutionID updated. Affected rows:", result.affectedRows);
          resolve();
        }
      });
    });

    // Insert institution data
    await new Promise((resolve, reject) => {
      connector.query('INSERT INTO FieldEx.institution SET ?', formData, (err, result) => {
        if (err) {
          console.error('Error inserting institution data:', err);
          reject('Error saving institution data');
        } else {
          console.log("Institution data inserted. Affected rows:", result.affectedRows);
          resolve();
        }
      });
    });

    // Prepare and insert data for educationLevels table
    const educationLevelsValues = educationLevels.map(level => [
      institutionID, level, studentCounts[level], teacherCounts[level]
    ]);

    await new Promise((resolve, reject) => {
      const query = 'INSERT INTO FieldEx.educationLevels (institutionID, educationLevel, studentCount, teacherCount) VALUES ?';
      connector.query(query, [educationLevelsValues], (err, result) => {
        if (err) {
          console.error('Error inserting education levels data:', err);
          reject('Error saving education levels data');
        } else {
          console.log("Education levels data inserted. Affected rows:", result.affectedRows);
          resolve();
        }
      });
    });

    // Insert other education level data if provided
    if (otherEducationLevel && otherStudentCount && otherTeacherCount) {
      const otherLevels = {
        institutionID,
        otherEducationLevel: otherEducationLevel,
        otherStudentCount: otherStudentCount,
        otherTeacherCount: otherTeacherCount
      };
      await new Promise((resolve, reject) => {
        connector.query('INSERT INTO FieldEx.otherEducationLevels SET ?', otherLevels, (err, result) => {
          if (err) {
            console.error('Error inserting other education level data:', err);
            reject('Error saving other education level data');
          } else {
            console.log("Other education level data inserted. Affected rows:", result.affectedRows);
            resolve();
          }
        });
      });
    }

    res.status(200).json({ message: "Submit Success" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: "Submit failed",
      error: error
    });
  }
});

app.listen(API_PORT, () => {
  initMySQL();
  console.log("https://fieldex-production.up.railway.app");
});
