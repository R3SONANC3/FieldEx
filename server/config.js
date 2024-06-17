require('dotenv').config();
const mysql = require('mysql2/promise');

const {
  JWT_SECRET,
  DB_HOST,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT
} = process.env;

let connector;

const initMySQL = async () => {
  try {
    connector = await mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log('Connected to database successfully!');
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    setTimeout(initMySQL, 5000);
    throw error;
  }
};

const getConnector = () => {
  if (!connector) {
    throw new Error('MySQL not initialized');
  }
  return connector;
};

module.exports = {
  JWT_SECRET,
  initMySQL,
  getConnector
};
