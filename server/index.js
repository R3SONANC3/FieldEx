const express = require('express');
const cors = require('cors');
const { initMySQL, getConnector } = require('./config');
const { corsOptions } = require('./middleware');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const dataRoutes = require('./routes/data');

const app = express();
const API_PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors(corsOptions)); // Handle CORS
app.options("*", cors(corsOptions)); // Handle preflight requests

// Use Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/user', userRoutes); // User routes
app.use('/api/data', dataRoutes); // Data routes

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
});

// Initialize MySQL and start server
app.listen(API_PORT, async () => {
  try {
    await initMySQL();
    console.log(`Server running on port ${API_PORT}`);
  } catch (error) {
    console.error('Failed to initialize MySQL:', error);
    process.exit(1); // Exit the process with failure
  }
});

module.exports = app;
