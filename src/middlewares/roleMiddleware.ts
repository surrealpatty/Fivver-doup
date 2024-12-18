import { Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types'; // Correct import path to CustomAuthRequest

// Middleware to check the user's role
export const checkRole = (requiredRole: 'admin' | 'paid') => {
  return (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user; // `user` will always exist due to the CustomAuthRequest type

    // Ensure the user is authenticated and has the role
    if (!user) {
      res.status(401).json({ message: 'User not authenticated' }); // Send response without returning
      return;  // Prevent further middleware from executing
    }

    // Check if the user has the required role
    if (requiredRole === 'paid' && user.tier !== 'paid') {
      res.status(403).json({ message: 'Forbidden: Paid tier required' }); // Send response without returning
      return;  // Prevent further middleware from executing
    }

    if (requiredRole === 'admin' && user.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden: Admin role required' }); // Send response without returning
      return;  // Prevent further middleware from executing
    }

    // Proceed to the next middleware or route handler if the user has the required role
    next(); // No return, only call next() to move to the next middleware or route
  };
};
