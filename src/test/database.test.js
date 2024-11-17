import { sequelize, testConnection } from '../config/database'; // Adjust the path to your database configuration
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
  let mockAuthenticate: jest.Mock;

  beforeAll(() => {
    // Set up the mock before tests run
    mockAuthenticate = jest.fn();
    sequelize.authenticate = mockAuthenticate; // Directly mock the instance's authenticate method
  });

  afterAll(() => {
    // Clear mocks after tests run to ensure no leftover state
    jest.clearAllMocks();
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
    expect(mockAuthenticate).toHaveBeenCalledWith();  // Ensure it was called without arguments

    // Check if the success message was logged
    expect(consoleLogSpy).toHaveBeenCalledWith('Database connection has been established successfully.');

    // Clean up spy after the test
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
    expect(mockAuthenticate).toHaveBeenCalledWith();  // Ensure it was called without arguments

    // Check if the error message was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Unable to connect to the database:', 'Connection failed');

    // Clean up spy after the test
    consoleErrorSpy.mockRestore();
  });
});
