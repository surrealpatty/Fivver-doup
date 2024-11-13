"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Adjust the path to your database configuration
// Mock Sequelize's authenticate method to avoid real database calls during tests
jest.mock('sequelize', () => {
    const originalSequelize = jest.requireActual('sequelize');
    return {
        ...originalSequelize,
        Sequelize: jest.fn().mockImplementation(() => ({
            authenticate: jest.fn(),
        })),
    };
});
describe('Database Connection', () => {
    // Mock the actual authenticate method
    const mockAuthenticate = jest.fn();
    beforeAll(() => {
        // Set up mock implementation for testing
        database_1.sequelize.authenticate = mockAuthenticate; // Mock the instance's authenticate method directly
    });
    afterAll(() => {
        jest.clearAllMocks(); // Clear mocks after tests run
    });
    test('should successfully connect to the database', async () => {
        mockAuthenticate.mockResolvedValueOnce(undefined); // Simulate a successful connection
        // Mock console.log
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        // Call the testConnection function
        await (0, database_1.testConnection)();
        // Ensure authenticate was called
        expect(mockAuthenticate).toHaveBeenCalledTimes(1);
        expect(mockAuthenticate).toHaveBeenCalledWith();
        // Check if success message was logged
        expect(consoleLogSpy).toHaveBeenCalledWith('Database connection has been established successfully.');
        // Clean up spy
        consoleLogSpy.mockRestore();
    });
    test('should fail to connect to the database', async () => {
        mockAuthenticate.mockRejectedValueOnce(new Error('Connection failed')); // Simulate a failed connection
        // Mock error logging
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        // Call the testConnection function
        await (0, database_1.testConnection)();
        // Ensure authenticate was called
        expect(mockAuthenticate).toHaveBeenCalledTimes(1);
        expect(mockAuthenticate).toHaveBeenCalledWith();
        // Check if error message was logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Unable to connect to the database:', 'Connection failed');
        // Clean up spy
        consoleErrorSpy.mockRestore();
    });
});
//# sourceMappingURL=database.test.js.map