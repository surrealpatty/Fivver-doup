// src/middlewares/tierMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export function checkTier(tier: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.tier !== tier) {
      res.status(403).json({ message: 'Insufficient tier' }); // Error response
    } else {
      next(); // Move to next middleware if check passes
    }
  };
}
