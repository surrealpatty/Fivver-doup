// src/middlewares/roleMiddleware.ts
import { Response, NextFunction } from 'express';
import { CustomAuthRequest, UserPayload } from '@types';  // Correct import using the alias

// Middleware to check the user's role
export const checkRole = (requiredRole: 'admin' | 'paid') => {
  return (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user; // `user` will always exist due to the CustomAuthRequest type

    // Ensure the user is authenticated and has the role
    if (!user) {
      res.status(401).json({ message: 'User not authenticated' }); // Send response if no user is found
      return; // Ensure no further processing occurs after sending the response
    }

    // Check if the user has the required role
    if (requiredRole === 'paid' && user.tier !== 'paid') {
      res.status(403).json({ message: 'Forbidden: Paid tier required' }); // Send response if user doesn't meet tier
      return; // Ensure no further processing occurs after sending the response
    }

    if (requiredRole === 'admin' && user.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden: Admin role required' }); // Send response if user isn't admin
      return; // Ensure no further processing occurs after sending the response
    }

    // Proceed to the next middleware or route handler if the user has the required role
    next(); // Simply call next() after sending the response
  };
};
