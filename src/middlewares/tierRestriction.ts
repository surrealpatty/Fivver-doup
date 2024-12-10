import { NextFunction, Request, Response } from 'express'; // Ensure NextFunction is imported
import { AuthRequest } from '../types'; // Ensure correct import of AuthRequest

// Middleware to restrict access to paid users
export const tierMiddleware = (
  req: AuthRequest, // Ensure the request type is correct
  res: Response, // The response type
  next: NextFunction // The next middleware function
): void => {
  const user = req.user; // User should be of type UserPayload

  if (!user || user.tier !== 'paid') {
    return res.status(403).json({ message: 'Access restricted to paid users only.' });
  }

  next(); // Allow access if the user is paid
};
