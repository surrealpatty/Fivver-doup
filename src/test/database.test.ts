// src/test/database.test.ts
import { sequelize,  testConnection } from '../config/database'; // Correct import for default and named export
import { User } from '../models/user'; // Correct named import

// Mock the sequelize instance's `authenticate` method and the `testConnection` function
jest.mock('sequelize', () => {
  return {
    Sequelize: jest.fn().mockImplementation(() => {
      return {
        authenticate: jest.fn().mockResolvedValue(true),
        sync: jest.fn().mockResolvedValue(true),
      };
    }),
  };
});

describe('Database Connection', () => {
  let mockAuthenticate: jest.Mock;
  let mockTestConnection: jest.Mock;

  // Initialize the mock functions for `authenticate` and `testConnection`
  beforeAll(() => {
    mockAuthenticate = sequelize.authenticate as jest.Mock;
    mockTestConnection = jest.fn(); // Create a mock for `testConnection` as a jest function
  });

  // Mock console methods globally
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock `console.log` and `console.error` for test isolation
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Clear all mocks to reset state between tests
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Close the database connection after all tests have finished running
    await sequelize.close();  // Close database connection
    console.log('Database connection closed');  // Optionally log to verify
  });

  // Test for a successful database connection
  it('should successfully connect to the database', async () => {
    // Simulate a successful connection
    mockAuthenticate.mockResolvedValueOnce(undefined); // Mock a successful authentication response
    mockTestConnection.mockResolvedValueOnce(true); // Mock the testConnection function to return true

    // Execute the `testConnection` function
    const connection = await testConnection();

    // Assertions
    expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Check `authenticate` was called once
    expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments
    expect(consoleLogSpy).toHaveBeenCalledWith('Database connection successful');
    expect(connection).toBeTruthy(); // Ensure the connection returns true
  });

  // Test for a failed database connection
  it('should log an error when the database connection fails', async () => {
    // Simulate a connection failure
    const errorMessage = 'Connection failed';
    mockAuthenticate.mockRejectedValueOnce(new Error(errorMessage)); // Mock the error on authenticate
    mockTestConnection.mockResolvedValueOnce(false); // Mock the testConnection function to return false

    // Execute the `testConnection` function
    const connection = await testConnection();

    // Assertions
    expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Check `authenticate` was called once
    expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Unable to connect to the database:',
      errorMessage
    ); // Check error log
    expect(connection).toBeFalsy(); // Ensure the connection fails
  });
});
