"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import express and Application type
const dotenv_1 = __importDefault(require("dotenv")); // For environment variables
const cors_1 = __importDefault(require("cors")); // For Cross-Origin Resource Sharing
const body_parser_1 = __importDefault(require("body-parser")); // For parsing JSON request bodies
const user_1 = __importDefault(require("./routes/user")); // Ensure correct path to user routes
const auth_1 = __importDefault(require("./routes/auth")); // Import auth routes for login/signup
const database_1 = require("./config/database"); // Ensure correct path to database configuration
dotenv_1.default.config(); // Load environment variables from the .env file
const app = (0, express_1.default)(); // Initialize the Express application
// Middleware setup
app.use((0, cors_1.default)()); // Enable CORS for all origins
app.use(body_parser_1.default.json()); // Parse incoming JSON requests
// Route setup
app.use('/api/users', user_1.default); // Register user routes under /api/users
app.use('/api/auth', auth_1.default); // Register authentication routes under /api/auth
// Database connection and server start
const startServer = async () => {
    try {
        // Authenticate the database connection
        await database_1.sequelize.authenticate();
        console.log('Database connected successfully!');
        // Sync models with the database schema
        await database_1.sequelize.sync({ alter: true }); // Use `alter` for dev, avoid in prod
        console.log('Database schema synced successfully!');
        // Start the server after syncing the database schema
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error connecting to the database or syncing schema:', error);
        process.exit(1); // Exit the process with a failure code
    }
};
// Start the server
startServer();
exports.default = app; // Export the app for testing or other purposes
//# sourceMappingURL=index.js.map