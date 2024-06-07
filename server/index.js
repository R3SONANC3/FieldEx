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

const verifyUser = async (req, res, next) => {
  const token = await req.cookies.token;
  if(!token) {
    return res.json({message: "We need token please provide it."})
  }else {
    jwt.verify(token, secret, (err, decode) =>{
      if (err) {
        return res.json({message:"Autentication failed"})
      }else {
        req.name = decode.name;
        next();
      }
    })
  }
}

app.get("/",verifyUser ,(req, res) => {
  return res.json({Status:"Success", name: req.name})
});

// app.post('/api/register', async (req, res) => {
//   const {email,password} = req.body;
//   try {
//     const result = await new Promise((resolve, reject) => 
//     connector.insert('FieldEx.users', {email,password}, (error, result)=>{
//       if(error){
//         reject(error);
//       }else{
//         resolve(result);
//       }
//     }));
//     res.status(200).json({message:'sucess', result});
//   } catch (error) {
//     console.log('error', error);
//     res.status(400).json({message: 'insert failed',error});
//   }
// });

// app.post('/api/login', async (req, res) => {
//   const {email,password} = req.body;
//   try {
//     const result = await new Promise((resolve, reject) => 
//     connector.search('FieldEx.users', `email = '${email}'`, (error, result)=>{
//       if(error){
//         reject(error);
//       }else{
//         resolve(result);
//       }
//     }));


//     res.status(200).json({message:'sucess', result});




//   } catch (error) {
//     console.log('error', error);
//     res.status(400).json({message: 'insert failed',error});
//   }
// });

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
    const userData = results[0]
    const match = await bcrypt.compare(password, userData.password)

    if (!match) {
      res.status(400).json({
        message: "Login Fail (Email or Password worng)"
      })
      return false
    }

    const token = jwt.sign({ email, role: userData.role }, secret, { expiresIn: '1h'})
    res.cookie('token', token, {
      maxAge: 300000,
      secure:true,
      httpOnly:true,
      sameSite:"none"
    })

    res.json({
      message: "Login successful!!"
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
  res.clearCookie('token', {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
  return res.json({ Status: "Logout Success" });
});

app.listen(port, async () => {
  await initMySQL();
  console.log("https://fieldex-production.up.railway.app/");
});