"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database")); // Named import for sequelize
const user_1 = __importDefault(require("./routes/user")); // Import user routes
const profile_1 = require("./routes/profile"); // Correct named import for profile router
const dotenv_1 = __importDefault(require("dotenv")); // For loading environment variables
// Load environment variables from .env file
dotenv_1.default.config();
// Create Express app instance
const app = (0, express_1.default)();
exports.app = app;
// Set up the server port
const port = process.env.PORT || 3000; // Default port is 3000
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Enable CORS (if needed for handling cross-origin requests)
app.use((0, cors_1.default)());
// Example route to test the server
app.get('/', (req, res) => {
    res.send('Welcome to Fiverr Clone!');
});
// Synchronize models with the database
database_1.default.sync({ alter: true }) // Using 'alter' to ensure no data loss
    .then(() => {
    console.log('Models are synchronized with the database.');
})
    .catch((error) => {
    console.error('Error syncing models:', error);
});
// Use the userRouter for routes starting with /api/users
app.use('/api/users', user_1.default); // Register the user routes under /api/users
// Register the profile route under /api/profile
app.use('/api/profile', profile_1.router); // Register profile route
// Test database connection
database_1.default.authenticate()
    .then(() => {
    console.log('Database connection established.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map