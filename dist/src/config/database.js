"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require("reflect-metadata"); // Ensure this is the first import
const sequelize_typescript_1 = require("sequelize-typescript"); // Import Sequelize from sequelize-typescript
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to load environment variables
const user_1 = require("../models/user"); // Import User model
const services_1 = require("../models/services"); // Import Service model
const order_1 = require("../models/order"); // Import Order model
const review_1 = require("../models/review"); // Import Review model
dotenv_1.default.config(); // Load environment variables from .env file
// Determine environment and use appropriate database config
const isTestEnv = process.env.NODE_ENV === 'test';
// Fetch database credentials from environment variables or fallback to defaults
const DB_USERNAME = isTestEnv ? process.env.TEST_DB_USERNAME : process.env.DB_USERNAME;
const DB_PASSWORD = isTestEnv ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD;
const DB_NAME = isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME;
const DB_HOST = isTestEnv ? process.env.TEST_DB_HOST : process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306; // Default port 3306
const DB_USE_SSL = process.env.DB_USE_SSL === 'true'; // Convert DB_USE_SSL to boolean
// Initialize Sequelize with sequelize-typescript
const sequelize = new sequelize_typescript_1.Sequelize({
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql', // Specify MySQL as the dialect
    models: [user_1.User, services_1.Service, order_1.Order, review_1.Review], // Include models for sequelize-typescript to use
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable logging only in development
    define: {
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
        timestamps: true, // Enable timestamp fields (createdAt and updatedAt)
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000, // Maximum time (ms) before throwing an error
        idle: 10000, // Maximum time (ms) before releasing an idle connection
    },
    dialectOptions: {
        charset: 'utf8mb4', // Ensures support for extended characters like emojis
        collate: 'utf8mb4_unicode_ci',
        ssl: DB_USE_SSL ? { require: true, rejectUnauthorized: false } : undefined, // Enable SSL if configured
    },
});
exports.sequelize = sequelize;
// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Unable to connect to the database:', error.message);
        }
        else {
            console.error('An unknown error occurred during the connection test');
        }
    }
};
// Call the test connection function
testConnection();
