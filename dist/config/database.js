"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user"));
const services_1 = __importDefault(require("../models/services"));
const order_1 = __importDefault(require("../models/order"));
const review_1 = require("../models/review");
dotenv_1.default.config(); // Load environment variables from .env file
// After fixing the last object or function declaration
const sequelize = new sequelize_typescript_1.Sequelize({
    username: process.env.DB_USERNAME || 'root', // Ensure no missing commas
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    models: [user_1.default, services_1.default, order_1.default, review_1.Review],
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
        freezeTableName: true,
        timestamps: true,
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        ssl: process.env.DB_USE_SSL === 'true'
            ? { require: true, rejectUnauthorized: false }
            : undefined,
    }
}); // Ensure the closing brace and parentheses are correct here
exports.sequelize = sequelize;
// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    }
    catch (error) {
        if (error instanceof Error) { // Type guard to ensure 'error' is of type Error
            console.error('Unable to connect to the database:', error.message);
        }
        else {
            console.error('An unknown error occurred during the connection test');
        }
        process.exit(1); // Exit the process if connection fails
    }
};
// Call the test connection function
testConnection();
