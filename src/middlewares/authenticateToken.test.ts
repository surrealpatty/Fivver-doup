import { Request, Response, NextFunction } from 'express';
import authenticateToken from './authenticateToken'; // Ensure the correct path to your middleware
import { UserPayload } from '../types'; // Ensure this is the correct type for your JWT payload

// Mock jsonwebtoken module
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('authenticateToken Middleware', () => {
  const mockNext = jest.fn(); // Mock next function
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {}; // Reset the mock request object
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Mock the status function to chain
      json: jest.fn().mockReturnThis(), // Mock the json function to chain
    };
    mockNext.mockClear(); // Clear previous calls to next()
  });

  it('should attach user to req.user if token is valid', () => {
    const mockToken = 'validToken';
    const mockPayload: UserPayload = { id: '123', email: 'user@example.com' }; // Define the expected payload

    // Set up the mock for jwt.verify to return the mockPayload
    (require('jsonwebtoken').verify as jest.Mock).mockReturnValue(mockPayload);

    // Mock request and set Authorization header
    mockRequest = {
      header: jest.fn().mockReturnValue(`Bearer ${mockToken}`),
    };

    // Call the middleware
    authenticateToken(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    // Check if next() was called, meaning the middleware passed successfully
    expect(mockNext).toHaveBeenCalled();

    // Check if the user was attached to req.user
    expect(mockRequest.user).toEqual(mockPayload);
  });

  it('should return 401 if no token is provided', () => {
    mockRequest = { header: jest.fn().mockReturnValue(null) }; // No token

    authenticateToken(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Authorization token is missing' });
  });

  it('should return 403 if token is invalid or expired', () => {
    const mockToken = 'invalidToken';

    // Simulate jwt.verify throwing an error for invalid token
    (require('jsonwebtoken').verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    mockRequest = {
      header: jest.fn().mockReturnValue(`Bearer ${mockToken}`),
    };

    authenticateToken(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
  });
});
