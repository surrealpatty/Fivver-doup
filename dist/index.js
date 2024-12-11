"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes"); // Ensure the routes file exports router correctly
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database"); // Ensure this path points to the correct database file (usually 'src/config/database')
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)()); // CORS middleware to handle cross-origin requests
app.use(express_1.default.json()); // To parse incoming JSON payloads
// Use the router for the app
app.use('/api', routes_1.router); // Prefix the routes with "/api"
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
//# sourceMappingURL=index.js.map