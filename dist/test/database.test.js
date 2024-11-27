var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sequelize, testConnection } from '../config/database'; // Correct import
// Mock the sequelize instance's `authenticate` method and the `testConnection` function
jest.mock('../config/database', () => {
    const originalDatabase = jest.requireActual('../config/database');
    return Object.assign(Object.assign({}, originalDatabase), { sequelize: Object.assign(Object.assign({}, originalDatabase.sequelize), { authenticate: jest.fn() }), testConnection: jest.fn() });
});
describe('Database Connection', () => {
    let mockAuthenticate;
    let mockTestConnection;
    // Initialize the mock functions for `authenticate` and `testConnection`
    beforeAll(() => {
        mockAuthenticate = sequelize.authenticate;
        mockTestConnection = testConnection;
    });
    // Mock console methods globally
    let consoleLogSpy;
    let consoleErrorSpy;
    beforeEach(() => {
        // Mock `console.log` and `console.error` for test isolation
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    afterEach(() => {
        // Clear all mocks to reset state between tests
        jest.clearAllMocks();
    });
    afterAll(() => {
        // Restore original implementations of console methods
        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
    // Test for a successful database connection
    it('should successfully connect to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulate a successful connection
        mockAuthenticate.mockResolvedValueOnce(undefined); // Mock a successful authentication response
        mockTestConnection.mockResolvedValueOnce(true); // Mock the testConnection function to return true
        // Execute the `testConnection` function
        const connection = yield testConnection();
        // Assertions
        expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Check `authenticate` was called once
        expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments
        expect(consoleLogSpy).toHaveBeenCalledWith('Database connection has been established successfully.'); // Check success log
        expect(connection).toBeTruthy(); // Ensure the connection returns true
    }));
    // Test for a failed database connection
    it('should log an error when the database connection fails', () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulate a connection failure
        const errorMessage = 'Connection failed';
        mockAuthenticate.mockRejectedValueOnce(new Error(errorMessage)); // Mock the error on authenticate
        mockTestConnection.mockResolvedValueOnce(false); // Mock the testConnection function to return false
        // Execute the `testConnection` function
        const connection = yield testConnection();
        // Assertions
        expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Check `authenticate` was called once
        expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments
        expect(consoleErrorSpy).toHaveBeenCalledWith('Unable to connect to the database:', errorMessage); // Check error log
        expect(connection).toBeFalsy(); // Ensure the connection fails
    }));
});
