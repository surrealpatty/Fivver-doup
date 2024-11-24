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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require('dotenv').config(); // Load environment variables from the .env file
// Import the config object containing the database configurations for different environments
const config = require('./config'); // Adjust the path to match your actual file structure
// Determine the environment (default to 'development' if not specified)
const environment = process.env.NODE_ENV || 'development';
// Ensure the config object contains the database configuration for the current environment
const dbConfig = (_a = config[environment]) === null || _a === void 0 ? void 0 : _a.db;
if (!dbConfig) {
    console.error(`No database configuration found for environment: ${environment}`);
    process.exit(1); // Exit if no config is found
}
// Create a new Sequelize instance using the environment-specific database configuration
const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false, // Disable logging in production (set to true in development if needed)
});
// Function to test the database connection
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');
    }
    catch (error) {
        // Type assertion to treat 'error' as an instance of 'Error'
        if (error instanceof Error) {
            console.error('Unable to connect to the database:', error.message);
        }
        else {
            console.error('An unknown error occurred while connecting to the database');
        }
        process.exit(1); // Exit the process if the connection fails
    }
});
// Run the connection test
testConnection();
// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;
