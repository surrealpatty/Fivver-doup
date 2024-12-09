import { Request, Response, NextFunction } from 'express';

export const checkPaidTier = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.tier !== 'paid') {
    return res.status(403).json({ message: 'Access restricted to paid tier users.' });
  }
  next();
};
