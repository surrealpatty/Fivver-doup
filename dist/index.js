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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Route setup
app.use('/api/users', user_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api', passwordReset_1.default); // Make sure passwordResetRoutes is being used
const startServer = async () => {
    try {
        await database_1.sequelize.authenticate();
        console.log('Database connected successfully!');
        await database_1.sequelize.sync({ alter: true });
        console.log('Database schema synced successfully!');
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