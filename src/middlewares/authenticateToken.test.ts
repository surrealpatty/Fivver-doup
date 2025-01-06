import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from './authenticateToken';
import { UserPayload } from '../types';
import jwt from 'jsonwebtoken';

// Mock jsonwebtoken module
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

// Extend the Express Request type to allow 'user' to be of type UserPayload | undefined
interface RequestWithUser extends Request {
  user?: UserPayload;
}

describe('authenticateToken Middleware', () => {
  const mockNext = jest.fn();
  let mockRequest: Partial<RequestWithUser>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext.mockClear();
  });

  it('should attach user to req.user if token is valid', () => {
    const mockToken = 'validToken';
    const mockPayload: UserPayload = { id: '123', email: 'user@example.com' };

    // Mock jwt.verify to return the expected payload
    (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

    // Mock request with Authorization header
    mockRequest = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    };

    authenticateToken(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    // Verify that next() was called
    expect(mockNext).toHaveBeenCalled();

    // Verify that the user was attached to req.user
    expect(mockRequest.user).toEqual(mockPayload);
  });

  it('should return 401 if no token is provided', () => {
    mockRequest = {
      headers: {
        authorization: '',
      },
    };

    authenticateToken(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    // Verify response for missing token
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Authorization token is missing' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid or expired', () => {
    const mockToken = 'invalidToken';

    // Mock jwt.verify to throw an error for invalid token
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    mockRequest = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    };

    authenticateToken(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    // Verify response for invalid token
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
