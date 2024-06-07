const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const mysql = require('mysql2/promise')
require('dotenv').config();


const secret = "mysecret"; // Generate key and store it in environment variables
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cookieParser());

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
  connector = await mysql.createConnection({
    host: 'fieldex.c3ssu4aw8v1d.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    database: 'FieldEx',
    password: '12345678',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

// Middleware to verify user
const verifyUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication required. Please provide a token." });
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Authentication failed" });
    }
    req.email = user.email;
    req.role = user.role;
    next();
  });
};

// Home route
app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", email: req.email, role: req.role });
});


// User registration
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const userData = { email, password: passwordHash, role: 'user' };
    const [results] = await connector.query("INSERT INTO users SET ?", userData);
    res.status(201).json({ message: "Register Success" });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: "Register failed", error });
  }
});


// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [results] = await connector.query('SELECT * FROM users WHERE email = ?', [email]);
    const userData = results[0];
    if (!userData) {
      return res.status(400).json({ message: "Login Fail (Email or Password wrong)" });
    }
    const match = await bcrypt.compare(password, userData.password);
    if (!match) {
      return res.status(400).json({ message: "Login Fail (Email or Password wrong)" });
    }
    const token = jwt.sign({ email, role: userData.role }, secret, { expiresIn: '1h' });
    res.json({ message: "Login successful!!", token });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: "Login failed", error });
  }
});


// Get all users (admin only)
app.get('/api/users', verifyUser, async (req, res) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const [results] = await connector.query('SELECT * FROM users');
    res.json(results);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: "Failed to retrieve users", error });
  }
});

// User logout
app.post('/api/logout', (req, res) => {
  res.json({ message: "Logout Success" });
});

app.listen(port, async () => {
  await initMySQL();
  console.log("https://fieldex-production.up.railway.app/");
});