const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require('mysql2/promise')
require('dotenv').config();


const secret ="mysecret";
const PORT = process.env.PORT || 8000;
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

// Handle preflight requests
app.options("*", cors(corsOptions));

let connector = null;

const initMySQL = async () => {
  try {
    connector = await  mysql.createConnection({
      host: 'fieldex.c3ssu4aw8v1d.ap-southeast-2.rds.amazonaws.com',
      user: 'admin',
      database: 'FieldEx',
      password: '12345678',
      port: '3306',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Error initializing MySQL connection:', error);
    // Optionally, you can rethrow the error to let the caller handle it
    throw error;
  }
};

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded; // Store decoded user information in req.user
    next();
  });
};


app.get("/",verifyUser ,(req, res) => {
  return res.json({Status:"Success", name: req.name})
});


app.post('/api/register', async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body

    const passwordHash = await bcrypt.hash(password, 10)

    const userData = {
      email,
      password: passwordHash,
      role: 'user'
    }
    const [results] = await connector.query("INSERT INTO FieldEx.users SET ? ", userData)
    res.json({
      message: "Register Success",
    })
  } catch (error) {
    console.log('error', error)
    res.json({
      message: "Register failed",
      error
    })

  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const [results] = await connector.query('SELECT * FROM FieldEx.users WHERE email = ?', email)
    const userData = results[0];
    const match = await bcrypt.compare(password, userData.password)

    if (!match) {
      res.status(400).json({
        message: "Login Failed (Incorrect Email or Password)"
      })
      return false
    }

    const token = jwt.sign({ email, role: userData.role }, secret, { expiresIn: '1h'})

    res.json({
      message: "Login successful!!",token
    })
  } catch (error) {
    console.log('error', error)
    res.status(401).json({
      message: "Login failed",
      error
    })
  }
});


app.get('/api/users', verifyUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const [results] = await connector.query('SELECT * FROM FieldEx.users');
    res.json(results);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: "Failed to retrieve users", error });
  }
});

app.get('/api/usersData', verifyUser, async (req,res) =>{
  if(req.user.role !== 'admin'){
    return res.status(403).json({message: "Access denied"});
  }
  try {
    const [results] = await connector.query('SELECT institutionID, institutionName FROM FieldEx.institution')
    res.json(results);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: "Failed to retrieve users", error })
  }
});


app.get('/api/logout', (req, res) => {
  return res.json({ Status: "Logout Success" });
});

app.get('/api/forms', verifyUser, async (req, res) => {
  try {
    // Query เพื่อค้นหารหัสสถานศึกษาจาก email
    const [userResults] = await connector.query('SELECT institutionID FROM FieldEx.users WHERE email = ?', [req.user.email]);
    
    if (userResults.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const institutionID = userResults[0].institutionID;

    // Query เพื่อค้นหาข้อมูลฟอร์มจากรหัสสถานศึกษา
    const [formResults] = await connector.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', [institutionID]);
    
    res.json(formResults);
  } catch (error) {
    console.error('Error retrieving forms:', error);
    res.status(500).json({ message: "Failed to retrieve forms", error });
  }
});



app.post('/api/submitge', async (req, res) => {
  const {
    institutionID, institutionName, telephone, fax, email, subdistrict, district, province,
    affiliation, headmasterName, projectDetail, educationLevels, studentCounts, teacherCounts,
    otherEducationLevel, userEmail
  } = req.body;

  try {
    const formData = {
      institutionID, institutionName, telephone, fax, email, subdistrict, district, province,
      affiliation, headmasterName, projectDetail
    };

    connector.query(`UPDATE \`users\` SET \`institutionID\` = ${institutionID} WHERE \`email\` = '${userEmail}'`);
    // Insert into institution table
    await connector.query('INSERT INTO FieldEx.institution SET ?', formData, (error) => {
      if (error) {
        console.error('Error inserting institution data:', error);
        res.status(500).send('Error saving institution data');
        return;
      }
    });

    // Prepare data for educationLevels table
    const educationLevelsValues = educationLevels.map(level => [
      institutionID, level, studentCounts[level], teacherCounts[level]
    ]);

    // Insert transformed education levels data into educationLevels table
    for (const eduLevel of educationLevelsValues) {
      await connector.query('INSERT INTO FieldEx.educationLevels (institutionID, educationLevel, studentCount, teacherCount) VALUES (?, ?, ?, ?)', eduLevel, (error) => {
        if (error) {
          console.error('Error inserting education levels data:', error);
          res.status(500).send('Error saving education levels data');
          return;
        }
      });
    }

    // Insert other education levels if not empty or null
    if (otherEducationLevel) {
      const otherLevels = { institutionID, otherEducationLevel };
      await connector.query('INSERT INTO FieldEx.otherEducationLevels SET ?', otherLevels, (error) => {
        if (error) {
          console.error('Error inserting other education level data:', error);
          res.status(500).send('Error saving other education level data');
          return;
        }
      });
    }

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

app.listen(PORT, async () => {
  await initMySQL();
  console.log("https://fieldex-production.up.railway.app/");
});