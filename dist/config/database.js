"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Ensure these environment variables are set in your .env file
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, // The database name
process.env.DB_USER, // The username
process.env.DB_PASSWORD, // The password
{
    host: process.env.DB_HOST || 'localhost', // The database host (default to 'localhost')
    dialect: 'mysql', // Database dialect (MySQL)
    port: 3306, // Explicitly set the port to 3306 (default MySQL port)
    logging: console.log, // Optional: log SQL queries to console for debugging
});
exports.sequelize = sequelize;
//# sourceMappingURL=database.js.map