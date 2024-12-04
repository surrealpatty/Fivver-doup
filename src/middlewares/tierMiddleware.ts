// src/middlewares/tierMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types'; // Ensure correct path

// Middleware to check the user's tier
export const checkTier = (requiredTier: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.tier !== requiredTier) {
      res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      return; // Explicitly return to prevent further processing
    }
    next(); // Proceed to the next middleware or route handler
  };
};
