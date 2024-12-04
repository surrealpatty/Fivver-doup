"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv")); // To load environment variables
// Load environment variables from .env file
dotenv_1.default.config();
// TypeScript type guard to ensure environment variables are set
const checkEnvVars = () => {
    const requiredVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
        console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
        return false;
    }
    return true;
};
// Ensure environment variables are available
if (!checkEnvVars()) {
    process.exit(1); // Exit if environment variables are missing
}
// Import the models after verifying environment variables
const user_1 = require("../models/user"); // Correct path to User model
const services_1 = __importDefault(require("../models/services")); // Correct path to Service model
// Initialize Sequelize instance with database connection details
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql', // Using MySQL dialect
    host: process.env.DB_HOST, // Database host from .env
    username: process.env.DB_USER, // Database user from .env (type assertion)
    password: process.env.DB_PASSWORD, // Database password from .env (type assertion)
    database: process.env.DB_NAME, // Database name from .env (type assertion)
    models: [user_1.User, services_1.default], // Register models explicitly here
    dialectOptions: {
        authPlugins: {
            mysql_native_password: () => { }, // Disable default auth plugin for MySQL 8
        },
    },
    logging: false, // Disable Sequelize logging (optional)
});
exports.sequelize = sequelize;
// Test database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful');
        return true;
    }
    catch (error) {
        console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
        return false;
    }
};
exports.testConnection = testConnection;
//# sourceMappingURL=database.js.map