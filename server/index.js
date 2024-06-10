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

app.get('/api/usersData', verifyUser, async (req,res) =>{
  if(req.role !== 'admin'){
    return res.status(403).json({message: "Access denied"});
  }
  try {
    const [results] = await connector.query('SELECT email, institutionName FROM FieldEx.generalForm')
    res.json(results);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: "Failed to retrieve users", error })
  }
});


app.get('/api/logout', (req, res) => {
  return res.json({ Status: "Logout Success" });
});

app.post('/api/add_general_form', async (req, res) => {
  try {
    const formData = req.body; // Form data sent from the frontend

    // Convert arrays and objects to strings before inserting
    formData.educationLevels = JSON.stringify(formData.educationLevels);
    formData.studentCounts = JSON.stringify(formData.studentCounts);
    formData.teacherCounts = JSON.stringify(formData.teacherCounts);

    // Insert the form data into the database table
    const [results] = await connector.query("INSERT INTO FieldEx.geForm SET ?", formData);
    
    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Failed to submit form", error });
  }
});
 


app.listen(PORT, async () => {
  await initMySQL();
  console.log("https://fieldex-production.up.railway.app/");
});