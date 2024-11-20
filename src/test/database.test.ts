import { sequelize, testConnection } from '../config/database'; // Adjust the path if necessary

// Mock sequelize instance's authenticate method to avoid real database calls during tests
jest.mock('../config/database', () => {
  const originalDatabase = jest.requireActual('../config/database');
  return {
    ...originalDatabase,
    sequelize: {
      ...originalDatabase.sequelize,
      authenticate: jest.fn(), // Mock the authenticate method on the sequelize instance
    },
  };
});

describe('Database Connection', () => {
  let mockAuthenticate: jest.Mock;

  beforeAll(() => {
    // Set up the mock for authenticate method before tests run
    mockAuthenticate = sequelize.authenticate as jest.Mock; // Cast to mock function
  });

  afterEach(() => {
    // Clear all mocks after each test to ensure no state is carried over
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Ensure all mocks are restored after tests run
    jest.restoreAllMocks();
  });

  test('should successfully connect to the database', async () => {
    // Simulate a successful connection
    mockAuthenticate.mockResolvedValueOnce(undefined);

    // Mock console.log to check the success message
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    // Call the testConnection function
    await testConnection();

    // Ensure authenticate was called once
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments

    // Check if success message was logged
    expect(consoleLogSpy).toHaveBeenCalledWith('Database connection has been established successfully.');

    // Clean up spy
    consoleLogSpy.mockRestore();
  });

  test('should fail to connect to the database', async () => {
    // Simulate a failed connection
    mockAuthenticate.mockRejectedValueOnce(new Error('Connection failed'));

    // Mock console.error to check the error message
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Call the testConnection function
    await testConnection();

    // Ensure authenticate was called once
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments

    // Check if error message was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Unable to connect to the database:', 'Connection failed');

    // Clean up spy
    consoleErrorSpy.mockRestore();
  });
});
