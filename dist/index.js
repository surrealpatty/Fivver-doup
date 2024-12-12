"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Use the router for the app
app.use('/api', routes_1.default);
// Test DB connection and start server
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected successfully!');
    // Use the PORT environment variable or default to 4000
    const port = process.env.PORT || 4000; // Changed port here
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database:', error);
});
exports.default = app;
//# sourceMappingURL=index.js.map