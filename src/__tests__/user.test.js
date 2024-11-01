const { registerUser, loginUser } = require('../src/controllers/userController');

describe('User Functions', () => {
  test('should register a new user', async () => {
    const userData = {
      username: 'testuser',
      password: 'password123',
    };
    const expectedResult = {
      success: true,
      message: 'User registered successfully',
    };

    const result = await registerUser(userData);
    expect(result).toEqual(expectedResult);
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

    const result = await loginUser(userData);
    expect(result).toEqual(expectedResult);
  });
});
