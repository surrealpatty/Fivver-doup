// src/middlewares/authMiddleware.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authMiddleware';  // Importing AuthRequest type

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });  // Return response directly
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });  // Return response directly
    }

    if (user) {
      // Cast the 'user' to match our UserPayload interface
      const userPayload = {
        id: (user as any).id,  // Explicit cast here to access 'id' and other fields
        email: (user as any).email,
        username: (user as any).username,
        tier: (user as any).tier, // Ensure 'tier' is available
      };
      
      req.user = userPayload;  // Attach user info to req.user
    }
    
    next();  // Move to next middleware
  });
};
