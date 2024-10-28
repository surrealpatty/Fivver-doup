// app.js

const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Path to the Sequelize instance
const userRoutes = require('./routes/user'); // User routes
const reviewRoutes = require('./routes/review'); // Review routes
const cors = require('cors'); // Import CORS

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Use CORS to enable cross-origin resource sharing
app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON requests
app.use(express.json());

// Set up routes
app.use('/api/users', userRoutes); // Prefix for user routes
app.use('/api/reviews', reviewRoutes); // Prefix for review routes

// Test and synchronize the database connection
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Synchronize models with the database
        await sequelize.sync(); 
        console.log('Database synchronized successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit if unable to connect
    }
};

// Call the function to initialize the database
initializeDatabase();

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
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
