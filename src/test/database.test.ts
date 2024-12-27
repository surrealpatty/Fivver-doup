import { sequelize, testConnection } from '.././config/database'; // Ensure correct import

describe('Database Connection', () => {
  let mockAuthenticate: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  // Set up mocks before each test
  beforeEach(() => {
    mockAuthenticate = jest
      .spyOn(sequelize, 'authenticate')
      .mockResolvedValue(); // Mock authenticate method
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(); // Mock console log
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(); // Mock console error
  });

  // Clear mocks after each test to ensure clean state
  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks to avoid leakage between tests
  });

  // This will run after all tests have completed
  afterAll(async () => {
    // Close the database connection to avoid lingering open connections
    await sequelize.close();
  });

  test('should successfully connect to the database', async () => {
    // Ensure that mockAuthenticate is called once
    const connection = await testConnection();

    expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Ensure mockAuthenticate was called
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Database connection successful'
    ); // Ensure console log message is correct
    expect(connection).toBeTruthy(); // Ensure connection is successful
  });

  test('should log an error when the database connection fails', async () => {
    const errorMessage = 'Test Connection Error';
    mockAuthenticate.mockRejectedValueOnce(new Error(errorMessage)); // Simulate connection failure

    const connection = await testConnection();

    // Ensure that mockAuthenticate was called
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    // Ensure the error message is logged to console
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Unable to connect to the database:',
      errorMessage
    );
    expect(connection).toBeFalsy(); // Ensure connection is unsuccessful
  });
});
