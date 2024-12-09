"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript"); // Import Sequelize from sequelize-typescript
const path_1 = __importDefault(require("path")); // Import path module for resolving directories
// Initialize Sequelize instance with sequelize-typescript
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql', // Specify the database dialect
    host: 'localhost', // Database host (e.g., localhost)
    username: 'root', // MySQL username
    password: 'password', // MySQL password
    database: 'fivver_doup', // Database name
    logging: true, // Enable logging in development
    models: [path_1.default.join(__dirname, '..', 'models')], // Dynamically load all models in the 'models' directory
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
exports.default = exports.sequelize;
