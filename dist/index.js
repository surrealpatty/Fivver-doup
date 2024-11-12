"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database"); // Import Sequelize instance
const user_1 = __importDefault(require("./routes/user")); // Import user routes
// Load environment variables from .env file
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use(express_1.default.json()); // Middleware to parse JSON request bodies
app.use((0, cors_1.default)()); // Middleware to enable CORS
// Routes
app.use('/api/users', user_1.default); // Route handling for '/api/users'
// Function to test the database connection
const testConnection = async () => {
    try {
        await database_1.sequelize.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Unable to connect to the database:', error.message); // Only access message if error is an instance of Error
        }
        else {
            console.error('Unable to connect to the database:', error); // Log raw error if it's not an instance of Error
        }
        process.exit(1); // Exit the process if the connection fails
    }
};
// Function to start the server and sync the database
const startServer = async () => {
    try {
        // Test DB connection
        await testConnection();
        // Sync models with the database
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : {}; // Alter models in development, use default in production
        await database_1.sequelize.sync(syncOptions);
        console.log('Database synced successfully.');
        // Start the Express server
        const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not specified in .env
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error starting the server:', error.message); // Handle error message properly
        }
        else {
            console.error('Error starting the server:', error); // Log raw error if it's not an instance of Error
        }
    }
};
// Start the server
startServer();
//# sourceMappingURL=index.js.map