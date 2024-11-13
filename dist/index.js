"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database"); // Database configuration
const user_1 = __importDefault(require("./routes/user")); // Import user routes

// Load environment variables from .env file
dotenv_1.default.config();

// Initialize Express app
const app = express_1.default();
exports.app = app;

// Middleware
app.use(express_1.default.json()); // Parse JSON requests
app.use(cors_1.default()); // Enable CORS for cross-origin requests

// Root route - confirms server is running
app.get('/', (req, res) => {
    res.send('Fiverr backend is running');
});

// User-related routes
app.use('/api/users', user_1.default); 

// Function to initialize the database and start the server
const startServer = async () => {
    try {
        // Test DB connection
        await database_1.testConnection();
        console.log('Database connection successful.');

        // Sync database with optional configuration
        const isDevelopment = process.env.NODE_ENV === 'development';
        await database_1.sequelize.sync(isDevelopment ? { alter: true } : {});
        console.log('Database synced successfully.');

        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1); // Exit on error
    }
};

// Start server if executed directly (e.g., not during testing)
if (require.main === module) {
    startServer();
}
