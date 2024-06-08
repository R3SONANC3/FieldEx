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
      req.role = decoded.role; // Assuming role is stored in the token
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
  if (req.role !== 'admin') {
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

app.get('/api/logout', (req, res) => {
  return res.json({ Status: "Logout Success" });
});

app.post('/api/submitGeForm', (req, res) => {
  const formData = req.body;

  // Determine which education level to use
  const finalEducationLevel = formData.educationLevel === 'อื่นๆ' ? formData.otherEducationLevel : formData.educationLevel;

  // Insert form data into the database
  const query = `
    INSERT INTO generalForm (
      educationLevel, studentCount, teacherCount, institutionName, phoneNumber, faxNumber, email, district, province, affiliation, headName, projectDetail
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    finalEducationLevel,
    formData.studentCount,
    formData.teacherCount,
    formData.institutionName,
    formData.phoneNumber,
    formData.faxNumber,
    formData.email,
    formData.district,
    formData.province,
    formData.affiliation,
    formData.headName,
    formData.projectDetail
  ];

  connector.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ message: 'Error inserting data into the database' });
      return;
    }
    res.status(200).json({ message: 'Data received and saved successfully' });
  });
});

app.listen(PORT, async () => {
  await initMySQL();
  console.log("https://fieldex-production.up.railway.app/");
});