"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript"); // Import Sequelize from sequelize-typescript
// Initialize Sequelize instance with sequelize-typescript
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql', // Specify the database dialect
    host: 'localhost', // Database host (e.g., localhost)
    username: 'root', // MySQL username
    password: 'password', // MySQL password
    database: 'fivver_doup', // Database name
    logging: false, // Disable logging for production (optional)
    models: [__dirname + '/../models'], // Automatically load all models in the 'models' directory
});
// Optional: Test the connection
(async () => {
    try {
        await exports.sequelize.authenticate(); // Test the connection to the database
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error); // Catch connection errors
    }
})();
