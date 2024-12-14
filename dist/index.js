"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const passwordReset_1 = __importDefault(require("./routes/passwordReset")); // Import password reset routes
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing
app.use(express_1.default.json()); // Parse incoming JSON requests
// Route setup
app.use('/api/users', user_1.default); // User-related routes
app.use('/api/auth', auth_1.default); // Authentication-related routes
app.use('/api/password-reset', passwordReset_1.default); // Correctly register password reset routes under /api/password-reset
const startServer = async () => {
    try {
        // Test database connection
        await database_1.sequelize.authenticate();
        console.log('Database connected successfully!');
        // Sync the database schema (alter the tables if needed)
        await database_1.sequelize.sync({ alter: true });
        console.log('Database schema synced successfully!');
        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error connecting to the database or syncing schema:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map