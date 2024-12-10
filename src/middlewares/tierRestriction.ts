// src/middlewares/tierRestriction.ts
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';  // Correct import path

// Middleware function to check the user's tier
export const checkPaidTier = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Ensure that req.user is defined before accessing its properties
  if (!req.user || req.user.tier !== 'paid') {
    return res.status(403).json({ message: 'Access restricted to paid tier users.' });
  }
  next();
};
