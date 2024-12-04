"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv")); // For loading environment variables
const database_1 = require("@config/database"); // Correct path for sequelize config
const api_1 = __importDefault(require("./routes/api")); // Importing API routes (includes /services, etc.)
const user_1 = __importDefault(require("./routes/user")); // User routes
const testEmailRoute_1 = __importDefault(require("./routes/testEmailRoute")); // Test email route
const service_1 = __importDefault(require("./routes/service")); // Import services route
const user_2 = require("@models/user"); // Correct model path for User
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
// Verify necessary environment variables are set
const port = process.env.PORT || 3000; // Default to 3000 if not provided
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
if (!dbName || !dbUser || !dbPassword || !dbHost) {
    console.error('Missing required environment variables for database connection.');
    process.exit(1); // Exit the app if critical variables are missing
}
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Register routes
app.use('/api/users', user_1.default); // All user-related routes
app.use('/api', api_1.default); // Register /services and other API routes here
app.use('/test', testEmailRoute_1.default); // Test email route
app.use('/services', service_1.default); // Register /services route here
// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Fiverr Clone!');
});
// Verify database connection
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connection established.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the app if database connection fails
});
// Sync models with the database
database_1.sequelize
    .sync()
    .then(() => {
    console.log('Database synced successfully.');
})
    .catch((err) => {
    console.error('Error syncing database:', err);
    process.exit(1); // Exit the app if syncing fails
});
// Fetch users as a test (ensure it runs after the database sync)
database_1.sequelize
    .sync()
    .then(async () => {
    try {
        const users = await user_2.User.findAll();
        console.log('Users:', users);
    }
    catch (error) {
        console.error('Error fetching users:', error.message);
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// Export app for testing
exports.default = app;
//# sourceMappingURL=index.js.map