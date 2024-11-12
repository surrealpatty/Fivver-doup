import { sequelize, testConnection } from '../config/database';  // Adjust the path to your database configuration
import { Sequelize } from 'sequelize';

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
    (sequelize.authenticate as jest.Mock) = mockAuthenticate;
  });

  afterAll(() => {
    jest.clearAllMocks();  // Clear mocks after tests run
  });

  test('should successfully connect to the database', async () => {
    mockAuthenticate.mockResolvedValueOnce(undefined);  // Simulate a successful connection

    // Call the testConnection function
    await testConnection();

    // Ensure authenticate was called
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith();

    // Check if success message was logged
    expect(console.log).toHaveBeenCalledWith('Database connection has been established successfully.');
  });

  test('should fail to connect to the database', async () => {
    mockAuthenticate.mockRejectedValueOnce(new Error('Connection failed'));  // Simulate a failed connection

    // Mock error logging
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Call the testConnection function
    await testConnection();

    // Ensure authenticate was called
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith();

    // Check if error message was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Unable to connect to the database:', 'Connection failed');

    // Clean up spy
    consoleErrorSpy.mockRestore();
  });
});
