import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types'; // Ensure the path is correct

// Middleware to authenticate the token (JWT)
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      // Return immediately after sending a response
      return res.status(401).json({ message: 'No token provided' });
    }

    // Simulate token decoding here (this should be your actual logic)
    const decodedUser = { 
      id: '123',
      email: 'user@example.com',
      username: 'exampleUser',
      tier: 'paid' // This should come from your JWT or database
    };

    // Create the payload object with decoded user data
    const payload: UserPayload = {
      id: decodedUser.id,
      email: decodedUser.email,
      username: decodedUser.username,
      tier: decodedUser.tier,
    };

    req.user = payload; // Attach the user object to req.user

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Return immediately after sending a response if an error occurs
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

// Middleware to check if the user is authenticated (i.e., req.user exists)
export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    // Return immediately after sending a response if user is not authenticated
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next(); // Proceed to the next middleware or route handler
};
