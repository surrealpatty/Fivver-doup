"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.app = exports.server = void 0;
require("reflect-metadata"); // Ensure reflect-metadata is imported first
const express_1 = __importDefault(require("express"));
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./models/user"); // Import the User model
const review_1 = require("./models/review"); // Import the Review model
const premiumService_1 = __importDefault(require("./routes/premiumService")); // Import the premium service routes
const user_2 = __importDefault(require("./routes/user")); // Import the user routes
const service_1 = __importDefault(require("./routes/service")); // Import the service routes
const auth_1 = __importDefault(require("./routes/auth")); // Import the auth router
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Register the routes
app.use('/api/premium-service', premiumService_1.default); // Mount premium service routes under '/api/premium-service'
app.use('/api/users', user_2.default); // Mount user routes under '/api/users'
app.use('/api/services', service_1.default); // Mount service routes under '/api/services'
app.use('/auth', auth_1.default); // Mount auth routes under '/auth'
// Root route to confirm server is running
app.get('/', (req, res) => {
    res.status(200).send('Fiverr backend is running');
});
// Sequelize initialization
const sequelize = new sequelize_typescript_1.Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, // Add host from .env for flexibility
    dialect: 'mysql', // Set the database dialect
    models: [user_1.User, review_1.Review], // Add your models here
});
exports.sequelize = sequelize;
// Synchronize database and start the server only if the file is not imported as a module
let server; // Declare a variable to hold the server instance
if (require.main === module) { // Ensure this is the main module being executed
    sequelize
        .sync({ alter: true }) // Ensure the database schema is updated (optional)
        .then(() => {
        console.log('Database synchronized successfully.');
        // Start the server after the database is synchronized
        exports.server = server = app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    })
        .catch((error) => {
        console.error('Error synchronizing the database:', error.message);
    });
}
