// src/test/orderController.ts

import { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';  // Correct import
import { UserPayload } from '../types/index';  // Correctly import UserPayload

// Mock the req and res objects
const mockRequest = (userPayload: UserPayload) => ({
  headers: { authorization: 'Bearer valid-token' },
  user: userPayload, // Mock user payload
} as Request);

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('authenticateToken middleware', () => {
  it('should authenticate and attach user to req', () => {
    const userPayload: UserPayload = { id: '1', email: 'user@example.com' };

    const req = mockRequest(userPayload); // Mock request with user data
    const res = mockResponse();
    const next = jest.fn();

    authenticateToken(req, res, next); // Call the middleware

    expect(req.user).toEqual(userPayload); // Assert that user is attached to req
    expect(next).toHaveBeenCalled(); // Assert that the next function was called
  });

  it('should return 401 if no token is provided', () => {
    const req = mockRequest({} as UserPayload); // No user payload
    const res = mockResponse();
    const next = jest.fn();

    req.headers['authorization'] = ''; // Empty token

    authenticateToken(req, res, next); // Call the middleware

    expect(res.status).toHaveBeenCalledWith(401); // Status 401
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied, no token provided.' });
    expect(next).not.toHaveBeenCalled(); // Ensure next is not called
  });
});
