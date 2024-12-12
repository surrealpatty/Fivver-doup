"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes")); // Import your router
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database"); // Import sequelize configuration
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)()); // Enable CORS
app.use(express_1.default.json()); // Parse JSON bodies
// Use the router for API routes
app.use('/api', routes_1.default);
// Test DB connection and start the server
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected successfully!');
    // Use the PORT environment variable or default to 4000
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database:', error);
});
exports.default = app;
//# sourceMappingURL=index.js.map