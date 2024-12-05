"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Define your database connection here
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root', // Your MySQL username
    password: '', // Your MySQL password (empty in your case)
    database: 'fiverr_clone', // Your database name
});
exports.sequelize = sequelize;
// Function to test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection
        console.log('Connection established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
exports.testConnection = testConnection;
//# sourceMappingURL=database.js.map