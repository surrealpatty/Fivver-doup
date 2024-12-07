"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var database_1 = require("./config/database"); // Named import for sequelize
var user_1 = require("./routes/user"); // Import user routes
var profile_1 = require("./routes/profile"); // Default import for profile router
var dotenv_1 = require("dotenv"); // For loading environment variables
// Load environment variables from .env file
dotenv_1.default.config();
// Create Express app instance
var app = (0, express_1.default)();
exports.app = app;
// Set up the server port, defaulting to process.env.PORT or 3000
var port = process.env.PORT || 3000; // Default port is 3000, can be overridden for testing
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Enable CORS (if needed for handling cross-origin requests)
app.use((0, cors_1.default)());
// Example route to test the server
app.get('/', function (req, res) {
    res.send('Welcome to Fiverr Clone!');
});
// Synchronize models with the database
database_1.sequelize.sync({ alter: true }) // Using 'alter' to ensure no data loss
    .then(function () {
    console.log('Models are synchronized with the database.');
})
    .catch(function (error) {
    console.error('Error syncing models:', error);
});
// Use the userRouter for routes starting with /api/users
app.use('/api/users', user_1.default); // Register the user routes under /api/users
// Register the profile route under /api/profile
app.use('/api/profile', profile_1.default); // Register profile route
// Test database connection
database_1.sequelize.authenticate()
    .then(function () {
    console.log('Database connection established.');
})
    .catch(function (error) {
    console.error('Unable to connect to the database:', error);
});
// Global error handler middleware
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
});
// Start the server on dynamic port (use process.env.PORT or 3000)
var server = app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
exports.server = server;
