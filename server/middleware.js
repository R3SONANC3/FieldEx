const cors = require('cors');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const allowedOrigins = ["http://localhost:3000", "https://field-ex.vercel.app"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log('Origin:', origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error('Blocked by CORS:', origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


const verifyUser = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};


module.exports = {
  corsOptions,
  verifyUser
};
