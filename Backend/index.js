// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');  // Import the path module
const emailController = require('./emailController');
require('dotenv').config();


// Initialize app
const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',  // Replace with your frontend application URL
        credentials: true  // Enable credentials (cookies) for cross-origin requests
    }
));  // Use CORS middleware to enable cross-origin requests

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/emailSender', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.post('/send-email', emailController.sendEmail);

// Catch-all route to serve the frontend application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
