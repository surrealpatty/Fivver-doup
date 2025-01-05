"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.app = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database"); // Ensure the correct path to your Sequelize config
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return database_1.sequelize; } });
const dotenv_1 = __importDefault(require("dotenv"));
// Import route files
const premiumService_1 = __importDefault(require("./routes/premiumService"));
const user_1 = __importDefault(require("./routes/user"));
const service_1 = __importDefault(require("./routes/service"));
const auth_1 = __importDefault(require("./routes/auth")); // Import the auth router
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
exports.app = app;
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Register the routes
app.use('/api/premium-service', premiumService_1.default); // Mount premium service routes under '/api/premium-service'
app.use('/api/users', user_1.default); // Mount user routes under '/api/users'
app.use('/api/services', service_1.default); // Mount service routes under '/api/services'
app.use('/auth', auth_1.default); // Mount auth routes under '/auth'
// Root route to confirm server is running
app.get('/', (req, res) => {
    res.status(200).send('Fiverr backend is running');
});
// Port configuration
const PORT = process.env.PORT || 3000;
let server; // Declare a variable to hold the server instance
// Synchronize database and start server only if the file is not imported as a module
if (require.main === module) { // Ensure this is the main module being executed
    database_1.sequelize
        .sync({ alter: true }) // Ensure the database schema is updated (optional)
        .then(() => {
        console.log('Database synchronized successfully.');
        // Start the server after the database is synchronized
        exports.server = server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
        .catch((error) => {
        console.error('Error synchronizing the database:', error.message);
    });
}
