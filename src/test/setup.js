"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Cleaning up after all tests...');
    // Ensure the mock DB connection is properly closed
    try {
        yield database_1.sequelize.close(); // Ensure sequelize connection is closed asynchronously
        console.log('Sequelize connection closed.');
    }
    catch (error) {
        console.error('Error closing sequelize connection:', error);
    }
}));
// Ensure Jest global functions are available for all tests
require("@jest/globals"); // Import Jest globals to ensure they are available globally in tests
