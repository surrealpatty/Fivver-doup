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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database"); // Correctly import sequelize instance
const user_1 = __importDefault(require("./routes/user")); // Correct TypeScript import (omit .js)
dotenv_1.default.config(); // Load environment variables from .env file
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON request bodies
app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing (CORS)
// Routes
app.use('/api/users', user_1.default); // Use user routes for '/api/users'
// Function to test the database connection
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.authenticate(); // Test the database connection
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
        yield database_1.sequelize.sync(syncOptions);
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
exports.default = app; // Export using TypeScript's ES6 export
//# sourceMappingURL=index.js.map