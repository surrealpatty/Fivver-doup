// src/middlewares/tierMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types'; // Ensure the correct path

// Middleware to check the user's tier
export const checkTier = (requiredTier: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    if (!req.user || req.user.tier !== requiredTier) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next(); // Proceed to the next middleware or route handler
  };
};
