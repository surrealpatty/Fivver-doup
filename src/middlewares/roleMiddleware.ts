// src/middlewares/roleMiddleware.ts
import { Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types';  // Correct import for CustomAuthRequest

// Middleware to check the user's role
export const checkRole = (requiredRole: 'admin' | 'paid') => {
  return (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user; // `user` will always exist due to the CustomAuthRequest type

    // Ensure the user is authenticated and has the role
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });  // Return response if no user is found
    }

    // Check if the user has the required role
    if (requiredRole === 'paid' && user.tier !== 'paid') {
      return res.status(403).json({ message: 'Forbidden: Paid tier required' });  // Return response if user doesn't meet tier
    }

    if (requiredRole === 'admin' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin role required' });  // Return response if user isn't admin
    }

    // Proceed to the next middleware or route handler if the user has the required role
    next();  // No return value, simply proceed
  };
};
