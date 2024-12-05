import { Request, Response, NextFunction } from 'express';

// Define the type for the user object, assuming 'tier' is part of the user model
interface AuthRequest extends Request {
  user?: { id: string; email: string; username: string; tier: string }; // Add the 'tier' field to the user object
}

// Middleware to check if the user has the required tier
export const checkTier = (tier: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Check if the user exists and if the user has the required tier
    if (req.user?.tier !== tier) {
      res.status(403).json({ message: 'Forbidden: You need to be on the appropriate tier.' });
      return; // Stop further processing, but do not return a value
    }

    // If tier matches, proceed to the next middleware/handler
    next();
  };
};
