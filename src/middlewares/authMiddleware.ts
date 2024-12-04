// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types'; // Ensure correct path to types

// Middleware to authenticate the token (JWT)
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Simulate token decoding here (replace this with your actual logic)
    const decodedUser = { 
      id: '123',
      email: 'user@example.com',
      username: 'exampleUser',
      tier: 'paid' // This should come from your JWT or database
    };

    const payload = {
      id: decodedUser.id,
      email: decodedUser.email,
      username: decodedUser.username,
      tier: decodedUser.tier,
    };

    // Attach the user object to req.user
    req.user = payload;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

// Middleware to check if the user is authenticated (i.e., req.user exists)
export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next(); // Proceed to the next middleware or route handler
};
