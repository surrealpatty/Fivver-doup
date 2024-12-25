import { sequelize, testConnection } from '../config/database'; // Correct import

// Mock the sequelize instance's `authenticate` method and the `testConnection` function
jest.mock('../config/database', () => {
  const originalDatabase = jest.requireActual('../config/database');
  return {
    ...originalDatabase,
    sequelize: {
      ...originalDatabase.sequelize,
      authenticate: jest.fn(), // Mock the `authenticate` method
    },
    testConnection: jest.fn(), // Mock the testConnection function as well
  };
});

describe('Database Connection', () => {
  let mockAuthenticate: jest.Mock;
  let mockTestConnection: jest.Mock;

  // Initialize the mock functions for `authenticate` and `testConnection`
  beforeAll(() => {
    mockAuthenticate = sequelize.authenticate as jest.Mock;
    mockTestConnection = testConnection as jest.Mock;
  });

  // Mock console methods globally for test isolation
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock `console.log` and `console.error` to ensure clean test output
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Reset mocks to ensure tests are isolated
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
    mockAuthenticate.mockResolvedValueOnce(undefined); // Mock a successful authentication response
    mockTestConnection.mockResolvedValueOnce(true); // Mock the testConnection function to return true

    // Execute the `testConnection` function
    const connection = await testConnection();

    // Assertions
    expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Ensure authenticate is called once
    expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Database connection successful' // Check if success message is logged
    );
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
    expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Ensure authenticate is called once
    expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Unable to connect to the database:',
      errorMessage // Check if error message is logged
    );
    expect(connection).toBeFalsy(); // Ensure the connection fails
  });
});
