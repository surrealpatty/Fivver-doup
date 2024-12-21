// src/middlewares/tierRestriction.ts
import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '/types'; // Ensure the correct type is imported

export const tierMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user;

  // Check if the user exists and if their tier is 'paid'
  if (!user || user.tier !== 'paid') {
    res.status(403).json({ message: 'Access restricted to paid users only.' });
    return; // Make sure the function exits after sending the response
  }

  // Proceed to the next middleware if the user is paid
  next();
};
