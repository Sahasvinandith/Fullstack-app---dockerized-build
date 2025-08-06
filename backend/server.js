// mern-auth-app/backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/auth_db'; // 'mongodb' is the service name in docker-compose

// Middleware
app.use(cors()); // Enable CORS for all origins (for development)
app.use(express.json()); // Body parser for JSON requests

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Simple root route
app.get('/', (req, res) => {
    res.send('Authentication Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});


