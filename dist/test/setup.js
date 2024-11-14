"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Mock the Sequelize connection
// Mock global setup
jest.mock('../models/user', () => ({
    findOne: jest.fn(), // Mock findOne method
    create: jest.fn(), // Mock create method
}));
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(), // Mock verify method
    sign: jest.fn(), // Mock sign method (if needed)
}));
jest.mock('../config/database', () => ({
    sequelize: {
        authenticate: jest.fn().mockResolvedValue(undefined), // Mock a successful DB connection
    },
}));
// Global setup for environment variables or mock configurations
beforeAll(() => {
    // Set up mock environment variables (e.g., JWT secret key for signing and verification)
    process.env.JWT_SECRET = 'mock-secret-key'; // Example JWT secret for mocking JWT signing/verification
    // Optional: You can add more environment variables or other global setup here if needed
});
// Reset mocks to ensure no state leaks between tests
afterEach(() => {
    jest.clearAllMocks(); // Clears all mock calls and resets mock states for each test
});
// Optionally, you can define global tear-down tasks after all tests have run
afterAll(() => {
    // Perform any clean-up operations here if necessary (e.g., closing DB connections or removing global mocks)
    database_1.sequelize.authenticate.mockRestore(); // Restore the original implementation of sequelize.authenticate if necessary
});
//# sourceMappingURL=setup.js.map