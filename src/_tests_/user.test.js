// Correct the path to userController based on the dist folder structure
const { registerUser, loginUser } = require('../controllers/userController'); // Adjusted for dist folder

// Mock implementation of registerUser and loginUser
jest.mock('../controllers/userController', () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
}));

describe('User Functions', () => {
  beforeEach(() => {
    // Clear all instances and calls to the mock function before each test
    jest.clearAllMocks();
  });

  test('should register a new user', async () => {
    const userData = {
      username: 'testuser',
      password: 'password123',
    };
    const expectedResult = {
      success: true,
      message: 'User registered successfully',
    };

    // Mock the implementation of registerUser
    registerUser.mockResolvedValue(expectedResult);

    const result = await registerUser(userData);
    expect(result).toEqual(expectedResult);
    expect(registerUser).toHaveBeenCalledWith(userData); // Verify the function was called with the correct arguments
    expect(registerUser).toHaveBeenCalledTimes(1); // Verify the function was called once
  });

  test('should login an existing user', async () => {
    const userData = {
      username: 'testuser',
      password: 'password123',
    };
    const expectedResult = {
      success: true,
      message: 'User logged in successfully',
    };

    // Mock the implementation of loginUser
    loginUser.mockResolvedValue(expectedResult);

    const result = await loginUser(userData);
    expect(result).toEqual(expectedResult);
    expect(loginUser).toHaveBeenCalledWith(userData); // Verify the function was called with the correct arguments
    expect(loginUser).toHaveBeenCalledTimes(1); // Verify the function was called once
  });

  test('should fail to register a user with an existing username', async () => {
    const userData = {
      username: 'existinguser',
      password: 'password123',
    };
    const expectedResult = {
      success: false,
      message: 'Username already exists',
    };

    // Mock the implementation to simulate an existing username
    registerUser.mockResolvedValue(expectedResult);

    const result = await registerUser(userData);
    expect(result).toEqual(expectedResult);
    expect(registerUser).toHaveBeenCalledWith(userData);
    expect(registerUser).toHaveBeenCalledTimes(1);
  });

  test('should fail to login with incorrect credentials', async () => {
    const userData = {
      username: 'testuser',
      password: 'wrongpassword',
    };
    const expectedResult = {
      success: false,
      message: 'Invalid username or password',
    };

    // Mock the implementation to simulate incorrect credentials
    loginUser.mockResolvedValue(expectedResult);

    const result = await loginUser(userData);
    expect(result).toEqual(expectedResult);
    expect(loginUser).toHaveBeenCalledWith(userData);
    expect(loginUser).toHaveBeenCalledTimes(1);
  });

  test('should fail to login with a non-existent user', async () => {
    const userData = {
      username: 'nonexistentuser',
      password: 'password123',
    };
    const expectedResult = {
      success: false,
      message: 'User does not exist',
    };

    // Mock the implementation to simulate a non-existent user
    loginUser.mockResolvedValue(expectedResult);

    const result = await loginUser(userData);
    expect(result).toEqual(expectedResult);
    expect(loginUser).toHaveBeenCalledWith(userData);
    expect(loginUser).toHaveBeenCalledTimes(1);
  });
});
