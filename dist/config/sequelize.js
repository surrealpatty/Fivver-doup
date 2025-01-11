"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// src/config/sequelize.ts
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user")); // Ensure the path is correct
const services_1 = require("../models/services"); // Corrected import for named export
const order_1 = require("../models/order"); // Ensure the Order model exists and is correctly defined
const review_1 = require("../models/review"); // Ensure the Review model exists and is correctly defined
dotenv_1.default.config(); // Load environment variables from .env file
// Verify environment variables are loaded properly
if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME || !process.env.DB_HOST) {
    throw new Error("Missing required environment variables: DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST");
}
// Define Sequelize instance
exports.sequelize = new sequelize_typescript_1.Sequelize({
    username: process.env.DB_USERNAME || "root", // Database username (default: root)
    password: process.env.DB_PASSWORD || "password", // Database password (default: password)
    database: process.env.DB_NAME || "fivver_doup", // Database name (default: fivver_doup)
    host: process.env.DB_HOST || "127.0.0.1", // Database host (default: localhost)
    dialect: "mysql", // MySQL dialect
    models: [user_1.default, services_1.Service, order_1.Order, review_1.Review], // Ensure all models are correctly imported
    logging: process.env.NODE_ENV === "development" ? console.log : false, // Log queries in development
    define: {
        freezeTableName: true, // Prevent pluralized table names
        timestamps: true, // Add createdAt and updatedAt fields
    },
    pool: {
        max: 10, // Maximum number of connections
        min: 0, // Minimum number of connections
        acquire: 30000, // Maximum time (ms) to acquire a connection
        idle: 10000, // Maximum idle time (ms) before a connection is released
    },
    dialectOptions: {
        charset: "utf8mb4", // Use UTF-8 with full Unicode support
        ssl: process.env.DB_USE_SSL === "true"
            ? { require: true, rejectUnauthorized: false }
            : undefined, // Use SSL if specified in environment variables
    },
});
// Function to test database connection
const testConnection = async () => {
    try {
        await exports.sequelize.authenticate(); // Attempt to connect to the database
        console.log("Database connection established successfully.");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Unable to connect to the database:", error.message);
        }
        else {
            console.error("An unknown error occurred during the connection test.");
        }
    }
};
// Establish connection based on environment
if (process.env.NODE_ENV === "test") {
    beforeAll(async () => {
        console.log("Testing environment detected, verifying database connection...");
        await testConnection();
    });
}
else {
    testConnection();
}