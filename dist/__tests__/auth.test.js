// Adjusting the import path to refer to dist/src (transpiled code)
const { authenticateToken } = require('dist/src/middleware/authMiddleware');  // Use dist/src path for the middleware

// Mocking the request and response objects
const mockRequest = (headers = {}) => ({
  headers,
  body: {},
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('Authentication Middleware', () => {
  test('should authenticate a valid token', async () => {
    // Create a mock valid token
    const token = 'valid_token';
    const req = mockRequest({ Authorization: `Bearer ${token}` });
    const res = mockResponse();
    
    // Mocking the actual behavior of authenticateToken
    // Normally, the middleware will add the user data to the request after decoding the token
    const next = jest.fn();  // Mock next function

    // If necessary, mock any underlying dependencies (like JWT verification) here

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

    // Mock the behavior where authenticateToken fails and sends a 401 response
    await authenticateToken(req, res, next);

    // Assert that next() was not called and that the status was set to 401
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  // Additional tests can be added for other cases like missing token, etc.
});
