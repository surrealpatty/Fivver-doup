// src/middlewares/authMiddleware.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authMiddleware';  // Importing AuthRequest type
import { UserPayload } from '../types/authMiddleware';  // Importing UserPayload type

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Assuming the 'user' object from JWT contains the 'tier' information
    if (user) {
      // Cast the 'user' to match our UserPayload interface
      const userPayload: UserPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
        tier: user.tier, // Make sure 'tier' is coming from the JWT or elsewhere
      };
      
      req.user = userPayload;  // Attach the user info (including tier) to req.user
    }
    
    next();
  });
};
