import { Request, Response, NextFunction } from 'express';
import { UserPayload } from 'types/index';  // Import from 'types/index' instead of '@types/index'

// Define AuthRequest interface that extends the Express Request type
interface AuthRequest extends Request {
  user?: UserPayload;  // Ensure that user is typed correctly as UserPayload
}

// Middleware function to check the user's tier
export const checkPaidTier = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Ensure that req.user is defined before accessing its properties
  if (!req.user || req.user.tier !== 'paid') {
    return res.status(403).json({ message: 'Access restricted to paid tier users.' });
  }
  next();
};
