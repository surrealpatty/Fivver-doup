"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Enable CORS
const body_parser_1 = __importDefault(require("body-parser")); // Parse request bodies
const auth_1 = __importDefault(require("./routes/auth")); // Import authentication routes
const user_1 = __importDefault(require("./routes/user")); // Import user routes
const service_1 = __importDefault(require("./routes/service")); // Import service routes
// Load environment variables from .env file
dotenv_1.default.config();
// Create the Express application
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use((0, cors_1.default)()); // Enable CORS
app.use(body_parser_1.default.json()); // Parse JSON bodies
app.use(body_parser_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
// Define your routes
app.use('/api/users', user_1.default); // User-related routes
app.use('/api/services', service_1.default); // Service-related routes
app.use('/auth', auth_1.default); // Authentication routes
// Default route for health check
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
// Start the server only in non-test environments
const PORT = process.env.PORT || 3000;
let server; // Declare the server variable
if (process.env.NODE_ENV !== 'test') {
    exports.server = server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
else {
    console.log('Running in test mode. Server initialization is deferred to tests.');
}
// Gracefully shut down the server after tests
if (process.env.NODE_ENV === 'test') {
    afterAll(() => {
        if (server) {
            server.close(() => {
                console.log('Test server closed');
            });
        }
    });
}
