"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("express");
const cors_1 = __importDefault(require("cors"));
const database_1 = require("../config/database"); // Fix the import path for sequelize
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)()); // CORS middleware to handle cross-origin requests
app.use(express_1.default.json()); // To parse incoming JSON payloads
// Use the router for the app
const passwordReset_1 = __importDefault(require("./passwordReset")); // Import the password reset routes (if applicable)
const profile_1 = __importDefault(require("./profile")); // Import other route files
const router = (0, express_2.Router)();
// Include the password reset routes or other routes here
router.use('/password-reset', passwordReset_1.default); // Add password reset routes to the main router
// Other routes, like profile, services, etc.
router.use('/profile', profile_1.default); // Add profile routes
// More route imports can go here, and ensure they are added to the main router
app.use('/api', router); // Prefix the routes with "/api"
// Test DB connection and start server
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected successfully!');
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database:', error);
});
exports.default = router;
//# sourceMappingURL=index.js.map