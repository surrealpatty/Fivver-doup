"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database"); // Database configuration
const user_1 = __importDefault(require("./routes/user")); // Import user routes
// Load environment variables
dotenv_1.default.config(); // Ensure environment variables are loaded at the start
// Initialize Express app
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use(express_1.default.json()); // Parse JSON requests
app.use((0, cors_1.default)()); // Enable CORS for cross-origin requests
// Root route - ensures the correct message is returned for testing
app.get('/', (req, res) => {
    res.send('Fiverr backend is running');
});
// Routes
app.use('/api/users', user_1.default); // Set up user-related routes
// Function to initialize the database and start the server
const startServer = async () => {
    try {
        // Test DB connection
        await (0, database_1.testConnection)();
        console.log('Database connection successful.');
        // Sync database
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : {}; // Use 'alter' in development for automatic model updates
        await database_1.sequelize.sync(syncOptions);
        console.log('Database synced successfully.');
        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        // Enhanced error handling
        console.error('Error starting the server:', error instanceof Error ? error.message : error);
    }
};
// Start the server if this file is executed directly (avoid starting it during tests)
if (require.main === module) {
    startServer();
}
//# sourceMappingURL=index.js.map