// Adjusting the import path to refer to dist/src (transpiled code)
const { authenticateToken } = require('dist/middleware/authMiddleware');  // Use dist/src path for the middleware

// Mocking the request and response objects
const mockRequest = (headers = {}) => ({
  headers,
  body: {},
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis(); // Mock the status method
  res.json = jest.fn().mockReturnThis(); // Mock the json method
  return res;
};

describe('Authentication Middleware', () => {
  test('should authenticate a valid token', async () => {
    // Create a mock valid token
    const token = 'valid_token';
    const req = mockRequest({ Authorization: `Bearer ${token}` });
    const res = mockResponse();
    const next = jest.fn(); // Mock next function

    // Mocking JWT verification to simulate successful authentication
    jest.mock('jsonwebtoken', () => ({
      verify: jest.fn().mockImplementation((token, secret, callback) => {
        callback(null, { userId: 1 }); // Mock successful JWT verification
      }),
    }));

    // Call authenticateToken with the mock request and response
    await authenticateToken(req, res, next);

    // Assert that next() was called (indicating successful authentication)
    expect(next).toHaveBeenCalled();
  });

  test('should return 401 for invalid token', async () => {
    // Mock an invalid token scenario
    const req = mockRequest({ Authorization: 'Bearer invalid_token' });
    const res = mockResponse();
    const next = jest.fn();

    // Mocking JWT verification to simulate failure
    jest.mock('jsonwebtoken', () => ({
      verify: jest.fn().mockImplementation((token, secret, callback) => {
        callback('invalid token', null); // Simulate JWT verification failure
      }),
    }));

    // Call authenticateToken with the mock request and response
    await authenticateToken(req, res, next);

    // Assert that next() was not called and that the status was set to 401
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  test('should return 401 if no token is provided', async () => {
    // Mock a missing token scenario
    const req = mockRequest({});
    const res = mockResponse();
    const next = jest.fn();

    // Call authenticateToken with the mock request and response
    await authenticateToken(req, res, next);

    // Assert that next() was not called and that the status was set to 401
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is required' });
  });

  // Additional tests can be added for other cases like expired tokens, etc.
});
