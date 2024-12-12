"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes")); // Import your routes
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Use the router for the app
app.use('/api', routes_1.default); // Prefix routes with /api
// Test DB connection and sync schema
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected successfully!');
    // Sync models with the database schema, altering it if necessary
    return database_1.sequelize.sync({ alter: true }); // You can use { force: true } in development to drop and recreate tables
})
    .then(() => {
    console.log('Database schema synced successfully!');
    // Start the server after syncing the database schema
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database or syncing schema:', error);
});
exports.default = app;
//# sourceMappingURL=index.js.map