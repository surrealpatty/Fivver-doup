// src/middlewares/tierMiddleware.ts

import { CustomAuthRequest } from '@types';  // Import the correct type
import { Response, NextFunction } from 'express';

const checkTier = (requiredTier: 'paid' | 'free') => {
  return (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user; // `user` will be populated by authenticateToken middleware

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if the user has the required tier
    if (user.tier !== requiredTier) {
      return res.status(403).json({ message: `Forbidden: ${requiredTier} tier required` });
    }

    next();
  };
};

export { checkTier };
