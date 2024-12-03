import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to restrict access based on user tier.
 * @param requiredTier The required tier for access (e.g., "paid").
 */
export const checkTier = (requiredTier: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.tier !== requiredTier) {
      res.status(403).json({ message: `Access restricted to ${requiredTier} users only.` });
      return;
    }
    next();
  };
};
