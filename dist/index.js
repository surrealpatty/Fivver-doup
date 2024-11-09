"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Using require instead of import to match CommonJS syntax
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./config/database'); // Adjusted to named import for sequelize
const userRoutes = require('./routes/user'); // Adjusted to omit '.js' in TypeScript
// Load environment variables from .env file
dotenv.config();
// Create Express app
const app = express();
// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
// Routes
app.use('/api/users', userRoutes); // Use user routes for '/api/users'
// Function to test database connection
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit the process if connection fails
    }
});
// Function to start the server and sync the database
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Test DB connection
        yield testConnection();
        // Sync models with the database based on environment
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : { force: false }; // Alter models in development
        yield sequelize.sync(syncOptions);
        console.log('Database synced successfully.');
        // Start the Express server
        const PORT = process.env.PORT || 5000; // Use PORT from environment or default to 5000
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting the server:', error);
        // Don't call process.exit(1) unless it's critical
    }
});
// Initialize the server
startServer();
// Export the app for testing purposes
module.exports = app; // Ensure the app is exported for test usage
//# sourceMappingURL=index.js.map