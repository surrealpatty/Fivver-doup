"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const user_1 = __importDefault(require("./routes/user")); // Ensure correct import path
require("./models/associations"); // Ensure this is imported to apply the associations
// Load environment variables from .env file
dotenv_1.default.config();
// Check that necessary environment variables are available
if (!process.env.PORT || !process.env.NODE_ENV) {
    console.error('Missing necessary environment variables.');
    process.exit(1); // Exit if essential variables are missing
}
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON requests
app.use((0, cors_1.default)()); // Enable CORS for cross-origin requests
// Root route for testing
app.get('/', (req, res) => {
    res.send('Fiverr backend is running');
});
// User-related routes
app.use('/api/users', user_1.default);
// Function to initialize the database and start the server
const startServer = async () => {
    try {
        // Test DB connection
        await (0, database_1.testConnection)();
        console.log('Database connection successful.');
        // Sync database with models
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : {}; // Use 'alter' in development for automatic updates
        await database_1.sequelize.sync(syncOptions);
        console.log('Database synced successfully.');
        // Start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting the server:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1); // Exit the process with a failure code
    }
};
// Start the server only if this file is executed directly (i.e., not during testing)
if (require.main === module) {
    startServer();
}
// Export the app for testing purposes
exports.default = app;
//# sourceMappingURL=index.js.map