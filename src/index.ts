const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, testConnection } = require('./config/database');  // Correct import for sequelize and testConnection
const userRoutes = require('./routes/user');  // Import user routes

// Load environment variables from .env file as early as possible
dotenv.config();

// Ensure required environment variables are present
if (!process.env.NODE_ENV) {
    console.error('NODE_ENV is not defined. Ensure your .env file is configured correctly.');
    process.exit(1);  // Exit if environment variable is missing
}

if (!process.env.PORT) {
    console.error('PORT is not defined. Ensure your .env file is configured correctly.');
    process.exit(1);  // Exit if environment variable is missing
}

// Create Express app
const app = express();

// Middleware
app.use(express.json());  // Middleware to parse JSON request bodies
app.use(cors());  // Middleware to enable CORS

// Routes
app.use('/api/users', userRoutes);  // Route handling for '/api/users'

// Function to start the server and sync the database
const startServer = async () => {
    try {
        // Test DB connection
        await testConnection();

        // Sync models with the database
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : {};  // Alter models in development, use default in production

        // Sync database models (with or without alterations based on environment)
        await sequelize.sync(syncOptions);
        console.log('Database synced successfully.');

        // Start the Express server
        const PORT = process.env.PORT || 5000;  // Default to 5000 if PORT is not specified in .env
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        // Improved error handling
        if (error instanceof Error) {
            console.error('Error starting the server:', error.message);  // Handle error message properly
        } else {
            console.error('Error starting the server:', error);  // Log raw error if it's not an instance of Error
        }
    }
};

// Start the server
startServer();

// Export the app for testing purposes
module.exports = { app };  // Export app for use in test files
