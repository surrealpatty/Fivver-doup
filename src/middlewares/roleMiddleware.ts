// src/middlewares/roleMiddleware.ts

import { Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types'; // Ensure the path is correct

// Define possible roles and tiers
type UserRole = 'admin' | 'paid' | 'user'; // Add other roles as needed
type UserTier = 'free' | 'paid'; // Add other tiers if needed

// Middleware to check user roles and tiers
export const checkRole = (requiredRole: UserRole, requiredTier: UserTier) => {
  return (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user; // `user` is populated by the authenticateToken middleware

    // Ensure the user is authenticated and exists
    if (!user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;  // Ensure no further code is executed
    }

    // Check if the user has the required tier
    if (user.tier !== requiredTier) {
      res.status(403).json({ message: `Forbidden: ${requiredTier} tier required` });
      return;  // Ensure no further code is executed
    }

    // Check if the user has the required role
    if (user.role !== requiredRole) {
      res.status(403).json({ message: `Forbidden: ${requiredRole} role required` });
      return;  // Ensure no further code is executed
    }

    // Proceed to the next middleware or route handler if the user has the required role and tier
    next();  // Continue to the next middleware or route handler
  };
};
