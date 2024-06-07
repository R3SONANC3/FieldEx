const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const mysql = require('mysql2/promise');
require('dotenv').config();

const secret = process.env.JWT_SECRET || "mysecret";
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://field-ex.vercel.app"], // Ensure this matches the frontend's URL and port
  })
);
app.use(cookieParser());

let connector = null;

const initMySQL = async () => {
  connector = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};

// Middleware to verify user
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Authentication required. Please provide a token." });
  } else {
    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        return res.status(403).json({ message: "Authentication failed" });
      } else {
        req.email = decode.email;
        req.role = decode.role;
        next();
      }
    });
  }
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
    res.cookie('token', token, {
      maxAge: 3600000, // 1 hour
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.json({ message: "Login successful!!" });
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
app.get('/api/logout', (req, res) => {
  res.clearCookie('token', {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
  return res.json({ Status: "Logout Success" });
});

app.listen(port, async () => {
  await initMySQL();
  console.log(`Server running at https://fieldex-production.up.railway.app:${port}`);
});
