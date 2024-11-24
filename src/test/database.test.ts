// src/test/database.test.ts
import { sequelize, testConnection } from '../config/database'; // Correct import

// Mock the sequelize instance's `authenticate` method to avoid real database calls during tests
jest.mock('../config/database', () => {
  const originalDatabase = jest.requireActual('../config/database');
  return {
    ...originalDatabase,
    sequelize: {
      ...originalDatabase.sequelize,
      authenticate: jest.fn(), // Mock the `authenticate` method
    },
  };
});

describe('Database Connection', () => {
  let mockAuthenticate: jest.Mock;

  // Initialize the mock function for `authenticate`
  beforeAll(() => {
    mockAuthenticate = sequelize.authenticate as jest.Mock;
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

  afterAll(() => {
    // Restore original implementations of console methods
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  // Test for a successful database connection
  it('should successfully connect to the database', async () => {
    // Simulate a successful connection
    mockAuthenticate.mockResolvedValueOnce(undefined);

    // Execute the `testConnection` function
    await testConnection();

    // Assertions
    expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Check `authenticate` was called once
    expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Database connection has been established successfully.'
    ); // Check success log
  });

  // Test for a failed database connection
  it('should log an error when the database connection fails', async () => {
    // Simulate a connection failure
    const errorMessage = 'Connection failed';
    mockAuthenticate.mockRejectedValueOnce(new Error(errorMessage));

    // Execute the `testConnection` function
    await testConnection();

    // Assertions
    expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Check `authenticate` was called once
    expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Unable to connect to the database:',
      errorMessage
    ); // Check error log
  });
});
