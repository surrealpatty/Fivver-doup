"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Ensure this is correctly imported
/**
 * Global setup for environment variables or mock configurations.
 */
beforeAll(() => {
    // Set up mock environment variables
    process.env.JWT_SECRET = 'mock-secret-key'; // Mock JWT secret key for testing
    // Other environment variables can be set here if needed
    console.log('Setting up before all tests...');
});
/**
 * Reset mocks to ensure no state leaks between tests.
 */
afterEach(() => {
    jest.clearAllMocks(); // Clears all mock calls and resets mock states after each test
});
/**
 * Clean-up tasks after all tests have run.
 */
afterAll(async () => {
    console.log('Cleaning up after all tests...');
    // Ensure the mock DB connection is properly closed
    try {
        await database_1.sequelize.close(); // Ensure sequelize connection is closed asynchronously
        console.log('Sequelize connection closed.');
    }
    catch (error) {
        console.error('Error closing sequelize connection:', error);
    }
});
// Ensure Jest global functions are available for all tests
require("@jest/globals"); // Import Jest globals to ensure they are available globally in tests
