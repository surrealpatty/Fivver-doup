import { sequelize, testConnection } from '../config/database'; // Adjust path if necessary

// Mock the sequelize instance's authenticate method to avoid real database calls during tests
jest.mock('../config/database', () => {
  const originalDatabase = jest.requireActual('../config/database');
  return {
    ...originalDatabase,
    sequelize: {
      ...originalDatabase.sequelize,
      authenticate: jest.fn(), // Mock the authenticate method
    },
  };
});

describe('Database Connection', () => {
  let mockAuthenticate: jest.Mock;

  // Before all tests, set up the mock function
  beforeAll(() => {
    // Access the mock of authenticate
    mockAuthenticate = sequelize.authenticate as jest.Mock;
  });

  // Mock console methods globally before each test
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Set up the spies to mock console.log and console.error
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  // Clear mocks and spies after each test to avoid state leakage
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Restore spies after all tests are completed
  afterAll(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  test('should successfully connect to the database', async () => {
    // Simulate a successful connection
    mockAuthenticate.mockResolvedValueOnce(undefined);

    // Call the testConnection function
    await testConnection();

    // Ensure authenticate was called once
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments

    // Check if success message was logged
    expect(consoleLogSpy).toHaveBeenCalledWith('Database connection has been established successfully.');
  });

  test('should fail to connect to the database', async () => {
    // Simulate a failed connection
    mockAuthenticate.mockRejectedValueOnce(new Error('Connection failed'));

    // Call the testConnection function
    await testConnection();

    // Ensure authenticate was called once
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments

    // Check if error message was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Unable to connect to the database:', 'Connection failed');
  });
});
