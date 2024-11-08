"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_js_1 = __importDefault(require("./config/database.js")); // Adjusted to default import for sequelize
const user_js_1 = __importDefault(require("./routes/user.js")); // Import user routes
// Load environment variables from .env file
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON request bodies
app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing (CORS)
// Routes
app.use('/api/users', user_js_1.default); // Use user routes for '/api/users'
// Function to test database connection
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_js_1.default.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit the process if connection fails
    }
});
// Function to start the server and sync the database
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Test DB connection
        yield testConnection();
        // Sync models with the database
        // Use `alter: true` in development or `force: true` in testing
        yield database_js_1.default.sync({ alter: true });
        console.log('Database synced successfully.');
        // Start the Express server
        const PORT = process.env.PORT || 5000; // Use PORT from environment or default to 5000
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit if server setup fails
    }
});
// Initialize the server
startServer();
// Export the app for testing purposes
exports.default = app; // Ensure the app is exported for test usage
//# sourceMappingURL=index.js.map