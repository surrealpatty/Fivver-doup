import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types'; // Correct import for AuthRequest type

// Middleware to authenticate the token (JWT)
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Simulate token decoding here (replace with actual decoding logic)
    const decodedUser = { 
      id: '123',
      email: 'user@example.com',
      username: 'exampleUser',
      tier: 'paid', // This should come from the JWT or database
    };

    // Attach the user object to req.user
    req.user = decodedUser;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

// Middleware to check if the user is authenticated (i.e., req.user exists)
export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next(); // Proceed to the next middleware or route handler
};
