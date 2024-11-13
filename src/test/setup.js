"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Mock global setup
jest.mock('../models/user', function () {
    return {
        // Mocking the necessary methods on the User model
        findOne: jest.fn(),
        create: jest.fn(),
    };
}); // Mock the User model for the tests
// Mocking JWT verify method
jest.mock('jsonwebtoken', function () { return ({
    verify: jest.fn(),
    sign: jest.fn(), // You may also need to mock `sign` method depending on your tests
}); });
// Mock other necessary modules
// Example: Mock database connection
jest.mock('../config/database', function () { return ({
    sequelize: {
        authenticate: jest.fn().mockResolvedValue(undefined),
    },
}); });
// Example: Mocking a function that you may need in your tests
// jest.mock('../utils/someUtility', () => ({
//   someFunction: jest.fn().mockReturnValue('some value'),
// }));
// Optionally, you can add global setup for environment variables or mock implementations
beforeAll(function () {
    // Example: Set up mock environment variables if needed
    process.env.JWT_SECRET = 'mock-secret-key';
});
// Optionally, reset all mocks between tests to avoid state leakage
afterEach(function () {
    jest.resetAllMocks();
});
