import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types/index'; // Ensure the import path is correct

// Extending the Request type to include a user property typed as UserPayload
interface RequestWithUser extends Request {
  user?: UserPayload; // Ensuring req.user is correctly typed
}

/**
 * Middleware to restrict access based on user tier.
 * @param requiredTier The required tier for access (e.g., "paid").
 */
export const checkTier = (requiredTier: string) => {
  return (req: RequestWithUser, res: Response, next: NextFunction): void => {
    // Check if the user's tier matches the required tier
    if (req.user?.tier !== requiredTier) {
      res.status(403).json({ message: `Access restricted to ${requiredTier} users only.` });
      return;  // Explicitly return after sending a response
    }
    next();
  };
};
