import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../types';

export const tierMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user;

  if (!user || user.tier !== 'paid') {
    return res.status(403).json({ message: 'Access restricted to paid users only.' });
  }

  next(); // Allow access if the user is paid
};
