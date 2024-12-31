// src/test/database.test.ts

import { sequelize } from '../config/database';
import { User } from '../models/user'; // Ensure the User model is properly imported

describe('Database Tests', () => {
  // Real database connection test
  it('should connect to the database successfully', async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error; // Fail the test if the connection cannot be established
    }
  });

  // Mocked database connection test
  it('should mock database connection successfully', async () => {
    // Mock the sequelize.authenticate method to simulate a successful connection
    const mockAuthenticate = jest.fn().mockResolvedValue(undefined);

    // Temporarily replace the sequelize.authenticate method with the mock
    sequelize.authenticate = mockAuthenticate;

    // Call authenticate to test the mocked method
    const result = await sequelize.authenticate();

    // Assert that the mocked authenticate method was called and no error was thrown
    expect(mockAuthenticate).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  // Test database operation (e.g., creating a user)
  it('should create a user', async () => {
    const user = await User.create({ username: 'testuser', email: 'test@example.com' });
    expect(user).toBeDefined();
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
  });

  afterAll(async () => {
    await sequelize.close(); // Ensure proper teardown of the database connection
  });
});
