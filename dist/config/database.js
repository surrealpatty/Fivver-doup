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
exports.testConnection = exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
// Load environment variables from .env file
dotenv_1.default.config();
// List of required environment variables
const requiredKeys = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_DIALECT'];
// Function to check if all required environment variables are present
const checkEnvVariables = () => {
    for (const key of requiredKeys) {
        if (!process.env[key]) {
            console.error(`Missing required environment variable: ${key}`);
            process.exit(1); // Exit the process if any required variable is missing
        }
    }
};
// Check if all required environment variables are present
checkEnvVariables();
// Create a new Sequelize instance with the loaded environment variables
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, // Database name from .env
process.env.DB_USER, // Database user from .env
process.env.DB_PASSWORD, // Database password from .env
{
    host: process.env.DB_HOST, // Database host from .env
    dialect: process.env.DB_DIALECT, // Database dialect (mysql, postgres, etc.) from .env
    logging: false, // Disable Sequelize query logging, set to true if you want to see SQL queries
});
exports.sequelize = sequelize;
// Test the connection to the database
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit if the connection fails
    }
});
exports.testConnection = testConnection;
// Call the testConnection to ensure the connection works when this file is imported
testConnection();
//# sourceMappingURL=database.js.map