import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types/index'; // Relative import, adjust path accordingly


// Define AuthRequest interface that extends the Express Request type
interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
    tier: 'free' | 'paid';  // Correct type for tier (should be 'free' | 'paid')
  };
}

// Middleware function to check the user's tier
export const checkPaidTier = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Ensure that req.user is defined before accessing its properties
  if (!req.user || req.user.tier !== 'paid') {
    return res.status(403).json({ message: 'Access restricted to paid tier users.' });
  }
  next();
};
