"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
// Ensure custom type augmentation is loaded first
require("./types/express.d.ts");
// Import necessary modules
const express_1 = __importDefault(require("express")); // Import Express and types
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const database_1 = require("./config/database"); // Correct import for sequelize
const user_1 = __importDefault(require("./routes/user")); // Import userRouter
const profile_1 = __importDefault(require("./routes/profile")); // Import profileRouter
const auth_1 = __importDefault(require("./routes/auth")); // Import authRouter
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv for environment variables
dotenv_1.default.config(); // Load environment variables from .env
const app = (0, express_1.default)(); // Initialize Express app
exports.app = app;
// Set up the server port, defaulting to process.env.PORT or 3000
const port = process.env.PORT || 3000; // Default port is 3000, can be overridden for testing
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Enable CORS (if needed for handling cross-origin requests)
app.use((0, cors_1.default)());
// Example route to test the server
app.get('/', (_req, res) => {
    res.send('Welcome to Fiverr Clone!');
});
// Synchronize models with the database
database_1.sequelize.sync({ alter: true }) // Using 'alter' to ensure no data loss
    .then(() => {
    console.log('Models are synchronized with the database.');
})
    .catch((error) => {
    console.error('Error syncing models:', error);
});
// Use the userRouter for routes starting with /api/users
app.use('/api/users', user_1.default); // Register the user routes under /api/users
// Register the profile route under /api/profile
app.use('/api/profile', profile_1.default); // Register profile route
// Register the auth route under /api/auth
app.use('/api/auth', auth_1.default); // Register auth route for user registration/login
// Test database connection
database_1.sequelize.authenticate()
    .then(() => {
    console.log('Database connection established.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
// Global error handler middleware - Fix the signature with `NextFunction`
app.use((err, _req, res, _next) => {
    console.error(err); // Log the error
    res.status(500).json({ message: 'Something went wrong!' }); // Send generic error response
});
// Start the server on dynamic port (use process.env.PORT or 3000)
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.server = server;
//# sourceMappingURL=index.js.map