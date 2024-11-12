"use strict";
// src/config/database.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Initialize Sequelize with MySQL configuration
const sequelize = new sequelize_1.Sequelize('fivver_doup', 'test_user', 'your_test_password', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.sequelize = sequelize;
// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Unable to connect to the database:', error.message);
        }
        else {
            console.error('Unable to connect to the database:', error);
        }
        process.exit(1); // Exit the process if the connection fails
    }
};
exports.testConnection = testConnection;
//# sourceMappingURL=database.js.map