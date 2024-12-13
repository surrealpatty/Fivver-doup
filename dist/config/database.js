"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost', // Use DB_HOST from env or fallback to localhost
    username: process.env.DB_USER || '', // Use DB_USER from env, fallback to empty string
    password: process.env.DB_PASSWORD || '', // Use DB_PASSWORD from env, fallback to empty string
    database: process.env.DB_NAME || '', // Use DB_NAME from env, fallback to empty string
    logging: false, // Optional: disables SQL query logging
    define: {
        timestamps: true, // Automatically add `created_at` and `updated_at`
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
    },
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
        allowInvalidDates: true, // Allow invalid dates during synchronization
    }
});
exports.sequelize = sequelize;
// Sync database models with the schema
sequelize.sync({ alter: true }) // This will automatically update your schema based on your models
    .then(() => {
    console.log('Database synced');
})
    .catch((err) => {
    console.error('Error syncing database:', err);
});
//# sourceMappingURL=database.js.map