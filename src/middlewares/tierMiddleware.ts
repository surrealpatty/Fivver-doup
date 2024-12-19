import { Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types';  // Ensure correct import

// Fix the return types for middleware
export const tierMiddleware = (requiredTier: 'free' | 'paid') => {
  return (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user;

    // If user is not authenticated, send a 401 response
    if (!user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;  // No need to return anything else after sending the response
    }

    // If the user does not meet the required tier, send a 403 response
    if (user.tier !== requiredTier) {
      res.status(403).json({ message: `Forbidden: ${requiredTier} tier required` });
      return;  // No need to return anything else after sending the response
    }

    // If everything is fine, proceed to the next middleware
    next();  
  };
};
