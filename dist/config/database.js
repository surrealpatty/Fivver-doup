"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user"); // Correct relative path to User model
const services_1 = __importDefault(require("../models/services")); // Correct relative path to Service model
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Sequelize instance with database configuration
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost', // Use the environment variable or fallback to localhost
    username: process.env.DB_USER || '', // Use environment variable for DB user
    password: process.env.DB_PASSWORD || '', // Use environment variable for DB password
    database: process.env.DB_NAME || '', // Use environment variable for DB name
    logging: false, // Disable SQL query logging
    define: {
        timestamps: true, // Enable timestamps for models (createdAt, updatedAt)
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
    },
    dialectOptions: {
        supportBigNumbers: true, // Support big numbers in MySQL
        bigNumberStrings: true, // Ensure that big numbers are returned as strings
        allowInvalidDates: true, // Allow invalid dates
    },
});
exports.sequelize = sequelize;
// Sync database models with the schema
sequelize.sync({ alter: true }) // 'alter' will modify the schema to match models
    .then(() => {
    console.log('Database synced');
})
    .catch((err) => {
    console.error('Error syncing database:', err);
});
// Define model associations (e.g., User hasMany Service, Service belongsTo User)
user_1.User.hasMany(services_1.default, { foreignKey: 'userId' });
services_1.default.belongsTo(user_1.User, { foreignKey: 'userId' });
//# sourceMappingURL=database.js.map