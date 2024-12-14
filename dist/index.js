"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database"); // Import sequelize instance
const user_1 = require("./routes/user"); // Import user routes
const auth_1 = __importDefault(require("./routes/auth"));
const passwordReset_1 = __importDefault(require("./routes/passwordReset")); // Import password reset routes
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Route setup
app.use('/api/users', user_1.userRoutes);
app.use('/api/auth', auth_1.default);
app.use('/api/password-reset', passwordReset_1.default); // Register password reset routes
// Sync the database schema with Sequelize
const syncDatabase = async () => {
    try {
        // Authenticate the connection
        await database_1.sequelize.authenticate();
        console.log('Database connected successfully!');
        // Sync the schema (alter: true to update existing tables without deleting them)
        await database_1.sequelize.sync({ alter: true }); // Use `alter: true` instead of `force: true` to safely update schema
        console.log('Database schema synced successfully!');
    }
    catch (error) {
        console.error('Error connecting to the database or syncing schema:', error);
        process.exit(1); // Exit the process if the DB connection or sync fails
    }
};
// Start the server after syncing
const startServer = async () => {
    await syncDatabase();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map