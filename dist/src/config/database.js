"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv")); // Load environment variables from the .env file
const sequelize_typescript_1 = require("sequelize-typescript"); // Import Sequelize with TypeScript support
dotenv_1.default.config(); // Load environment variables
// Extract current environment and set defaults
const environment = process.env.NODE_ENV || 'development';
// Map environment variables for database configuration
const DB_USERNAME = environment === 'test' ? process.env.TEST_DB_USERNAME || 'test_user' : process.env.DB_USERNAME || 'root';
const DB_PASSWORD = environment === 'test' ? process.env.TEST_DB_PASSWORD || 'test_password' : process.env.DB_PASSWORD || 'password';
const DB_NAME = environment === 'test' ? process.env.TEST_DB_NAME || 'fivver_doup_test' : process.env.DB_NAME || 'fivver_doup';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USE_SSL = process.env.DB_USE_SSL === 'true';
// Configure Sequelize with options
const sequelize = new sequelize_typescript_1.Sequelize({
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    models: [
        require('../models/user').User,
        require('../models/services').Service,
        require('../models/order').Order,
        require('../models/review').Review,
    ],
    logging: environment === 'development' ? console.log : false, // Enable logging only in development
    define: {
        freezeTableName: true, // Prevent table name pluralization
        timestamps: true, // Enable timestamps (createdAt, updatedAt)
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000, // Max time (ms) before throwing an error
        idle: 10000, // Max time (ms) before releasing an idle connection
    },
    dialectOptions: {
        charset: 'utf8mb4', // Support extended characters
        collate: 'utf8mb4_unicode_ci',
        ssl: DB_USE_SSL
            ? { require: true, rejectUnauthorized: false } // Enable SSL if required
            : undefined,
    },
});
exports.sequelize = sequelize;
