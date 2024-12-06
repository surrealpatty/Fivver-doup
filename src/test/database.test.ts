import { sequelize, testConnection } from '../config/database';  // Import sequelize and testConnection

// Mocking the sequelize.authenticate method
jest.mock('../config/database', () => ({
  sequelize: {
    authenticate: jest.fn(),  // Mocking the 'authenticate' method
  },
  testConnection: jest.fn(), // Mocking the 'testConnection' method
}));

describe('Database Connection', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('should establish a connection successfully', async () => {
    // Arrange: Mock the behavior of authenticate to resolve successfully
    (sequelize.authenticate as jest.Mock).mockResolvedValueOnce(undefined);

    // Act: Call the testConnection function
    await testConnection();

    // Assert: Check if the correct function was called
    expect(sequelize.authenticate).toHaveBeenCalledTimes(1);
    expect(sequelize.authenticate).toHaveBeenCalledWith();
    // Further assertions if necessary
  });

  it('should fail to connect when an error is thrown', async () => {
    // Arrange: Mock the behavior of authenticate to throw an error
    const errorMessage = 'Unable to connect to the database';
    (sequelize.authenticate as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Act: Call the testConnection function
    await testConnection();

    // Assert: Check if the correct function was called and error is logged
    expect(sequelize.authenticate).toHaveBeenCalledTimes(1);
    expect(sequelize.authenticate).toHaveBeenCalledWith();
    // You could assert that an error message is logged if necessary
    // For example:
    // expect(console.error).toHaveBeenCalledWith('Unable to connect to the database:', expect.any(Error));
  });
});
