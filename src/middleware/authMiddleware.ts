// src/middleware/authMiddleware.ts
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types';  // Import the correct type

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Your logic to authenticate and attach user to req.user
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
