"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var database_1 = __importDefault(require("./src/config/database")); // Correct path to sequelize instance
var user_1 = require("./src/models/user"); // Correct path to the User model
var user_2 = __importDefault(require("./src/routes/user")); // Correct path to userRouter
// Create Express app instance
var app = (0, express_1.default)();
exports.app = app;
// Set up the server port
var port = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Example route
app.get('/', function (req, res) {
    res.send('Welcome to Fiverr Clone!');
});
// Database connection check
database_1.default
    .authenticate()
    .then(function () {
    console.log('Database connection established.');
})
    .catch(function (error) {
    console.error('Unable to connect to the database:', error);
});
// Example of using the User model (this could be moved to a service or controller later)
user_1.User.findAll() // Fetch users as a test
    .then(function (users) {
    console.log('Users:', users);
})
    .catch(function (error) {
    console.error('Error fetching users:', error);
});
// Use the userRouter for routes starting with /api/users
app.use('/api/users', user_2.default); // Register the user routes under /api/users
// Start the server
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
