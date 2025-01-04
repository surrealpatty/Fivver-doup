"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user")); // Ensure the path is correct
const services_1 = __importDefault(require("../models/services")); // Ensure the path is correct
const order_1 = __importDefault(require("../models/order")); // Ensure the Order model exists and is correctly defined
const review_1 = require("../models/review"); // Ensure the Review model exists and is correctly defined
dotenv_1.default.config(); // Load environment variables from .env file
const sequelize = new sequelize_typescript_1.Sequelize({
    username: process.env.DB_USERNAME || 'root', // Ensure no missing commas
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    models: [user_1.default, services_1.default, order_1.default, review_1.Review], // Ensure your models are correctly defined and imported
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
        // Removed process.exit(1) to prevent abrupt termination during testing
        // process.exit(1); // Removed this line to allow Jest to handle the error gracefully
    }
};
// Call the test connection function
testConnection();
