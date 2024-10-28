// app.js

const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Ensure the path is correct for the Sequelize instance
const userRoutes = require('./routes/user'); // Ensure the path is correct for user routes

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Set up routes
app.use('/api/users', userRoutes); // Prefix '/api/users' to organize routes better

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit if unable to connect
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred', error: err.message });
});

// Define the server port
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app instance
