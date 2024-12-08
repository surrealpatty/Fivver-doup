"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Initialize Sequelize with configuration
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql', // Database dialect
    host: 'localhost', // Database host
    username: 'root', // MySQL username
    password: 'password', // MySQL password
    database: 'fivver_doup', // Database name
    logging: false, // Optional: Disable logging for production
});
// Optional: Test the connection
(async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
