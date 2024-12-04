// src/middlewares/tierMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// Example tier checking middleware
export const checkTier = (tier: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.tier !== tier) {
      return res.status(403).json({ message: `User is not a ${tier} tier` });
    }
    next();
  };
};
