"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.closeConnection = exports.testConnection = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
// Destructure environment variables from process.env
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, NODE_ENV } = process.env;
// TypeScript type declaration for process.env (ensure all required variables are present)
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
    if (NODE_ENV !== 'test') {
        console.error('Missing required environment variables. Please check your .env file.');
        process.exit(1); // Exit the process if it's not in a test environment
    }
}
// Default values for database connection settings if not provided
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: DB_HOST || 'localhost', // Default to 'localhost' if not provided
    username: DB_USER || 'root', // Default to 'root' if not provided
    password: DB_PASSWORD || '', // Default to empty string if not provided
    database: DB_NAME || 'fivver_doup', // Default to 'fivver_doup' if not provided
    port: parseInt(DB_PORT || '3306', 10), // Default to 3306 if not provided
    logging: NODE_ENV === 'development', // Log SQL queries only in development
    dialectOptions: {
        timezone: 'Z', // Optional: Use UTC for MySQL queries (if applicable)
    },
    define: {
        timestamps: false, // Optional: Adjust if you don't want `createdAt` and `updatedAt` fields
    },
});
exports.sequelize = sequelize;
// Function to test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Unable to connect to the database:', error.message);
        }
        else {
            console.error('An unknown error occurred during the database connection');
        }
        // Exit the process only if it's not in a test environment
        if (NODE_ENV !== 'test') {
            process.exit(1); // Exit the process if connection fails
        }
    }
};
exports.testConnection = testConnection;
// Ensure sequelize connection is properly closed after tests or app shutdown
const closeConnection = async () => {
    try {
        await sequelize.close();
        console.log('Database connection has been closed.');
    }
    catch (error) {
        console.error('Error closing the database connection:', error);
    }
};
exports.closeConnection = closeConnection;
// Only call testConnection if it's not in a test environment
if (NODE_ENV !== 'test') {
    (0, exports.testConnection)();
}
