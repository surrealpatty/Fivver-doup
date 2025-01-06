"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript"); // Correct Sequelize import
const user_1 = require("../models/user"); // Ensure User is correctly imported
const services_1 = __importDefault(require("../models/services")); // Correct import for the Service model
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv for environment variables
dotenv_1.default.config(); // Load environment variables from .env file
let sequelizeInstance; // Declare sequelizeInstance for later use
// Initialize Sequelize with models explicitly
beforeAll(async () => {
    sequelizeInstance = new sequelize_typescript_1.Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST, // Use environment variables
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        models: [user_1.User, services_1.default], // Ensure both models are included
    });
    // Add models to Sequelize instance
    sequelizeInstance.addModels([user_1.User, services_1.default]);
    // Sync the database (force: true resets the tables)
    await sequelizeInstance.sync({ force: true });
});
// Test cases go here
// Cleanup after all tests are done
afterAll(async () => {
    // Close the Sequelize connection after tests
    await sequelizeInstance.close();
});
