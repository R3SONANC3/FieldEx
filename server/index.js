const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const mysql = require('mysql2/promise')


const secret = "mysecret"; // Generate key and store it in environment variables
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["https://main--fieldex.netlify.app/"], // Ensure this matches the frontend's URL and port
  }),
);
app.use(cookieParser());

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


app.get('/api/users', async (req, res) => {
  try {
    const authToken = req.cookies.token
    const user = jwt.verify(authToken, secret)

    // recheck from database
    const [checkResults] = await connector.query('SELECT * FROM FieldEx.users WHERE email = ?', user.email)
    if(!checkResults[0]) {
      throw { message:"User not found"}
    }
   
    // user confirm 
    const [results] = await connector.query('SELECT * FROM FieldEx.users')
    
    res.json({ email: decoded.email, role: decoded.role })
  } catch (error) {
    console.log('error', error)
    res.status(403).json({
      message: "Autentication failed",
      error
    })
  }
})

app.get('/api/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status:"Logout Success"})
})


app.listen(port, async () => {
  await initMySQL();
  console.log("https://fieldex-production.up.railway.app/");
});