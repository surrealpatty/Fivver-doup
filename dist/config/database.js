"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Initialize Sequelize with MySQL configuration
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: 'fivver_doup',
    username: 'test_user', // Make sure to use the correct test user for the MySQL instance
    password: 'your_test_password', // Ensure this is the correct password for your MySQL instance
    logging: false, // Turn off logging for cleaner output, set to true for debugging
});
exports.sequelize = sequelize;
// Test the database connection
const testConnection = async () => {
    try {
        // Test the database connection
        await sequelize.authenticate();
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
// Test the connection on script run
testConnection();
//# sourceMappingURL=database.js.map