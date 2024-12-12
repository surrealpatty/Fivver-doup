"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user")); // Import user routes
const database_1 = require("./config/database"); // Import sequelize for database connection
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)()); // Enable CORS
app.use(express_1.default.json()); // Parse JSON bodies in requests
// Routes setup
app.use('/api/user', user_1.default); // Use the user routes for paths starting with /api/user
// Test the database connection and sync the schema
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected successfully!');
    // Sync models with the database schema
    return database_1.sequelize.sync({ alter: true }); // Use { force: true } cautiously in development
})
    .then(() => {
    console.log('Database schema synced successfully!');
    // Start the server after syncing the database schema
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database or syncing schema:', error);
});
exports.default = app; // Export the app for testing or other use
//# sourceMappingURL=index.js.map