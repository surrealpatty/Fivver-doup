"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Import sequelize instance
const user_1 = require("../models/user"); // Use named import for User model
const services_1 = __importDefault(require("../models/services")); // Import Service and ServiceCreationAttributes
// Function to test user and service models
const testModels = async () => {
    try {
        // Synchronize models with the database
        await database_1.sequelize.sync({ force: true });
        console.log('Database synced successfully.');
        // Create a test user
        const testUser = await user_1.User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'free',
        });
        console.log('Test User created:', testUser.toJSON());
        // Create a test service associated with the user
        const testServiceData = {
            name: 'Test Service', // Add the missing name property
            title: 'Test Service Title',
            description: 'A description of the test service.',
            price: 99.99,
            userId: testUser.id, // Associate with the user
        };
        // Create the test service using the ServiceCreationAttributes type
        const testService = await services_1.default.create(testServiceData);
        console.log('Test Service created:', testService.toJSON());
    }
    catch (error) {
        console.error('Error testing models:', error);
    }
    finally {
        // Close the database connection
        await database_1.sequelize.close();
    }
};
// Export the function using ES module syntax
exports.default = testModels;
// Call the function to test models
testModels();
