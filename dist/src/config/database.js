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
// Fetch database credentials from environment variables or fallback to defaults
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME || 'fivver_doup';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_USE_SSL = process.env.DB_USE_SSL || 'false';
const sequelize = new sequelize_typescript_1.Sequelize({
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    models: [user_1.default, services_1.default, order_1.default, review_1.Review], // Define all your models here
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
        timestamps: true, // Ensure timestamp fields (createdAt, updatedAt) are automatically handled
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000, // Max time, in ms, before throwing an error
        idle: 10000, // Max time, in ms, before an idle connection is released
    },
    dialectOptions: {
        charset: 'utf8mb4', // Ensures support for extended characters, such as emojis
        collate: 'utf8mb4_unicode_ci',
        ssl: DB_USE_SSL === 'true'
            ? { require: true, rejectUnauthorized: false } // Enables SSL if DB_USE_SSL is true
            : undefined, // Disables SSL if DB_USE_SSL is false
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
