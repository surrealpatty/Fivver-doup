// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/authMiddleware';  // Correct import for AuthRequest
import { UserPayload } from '../types/authMiddleware';  // Correct import for UserPayload

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    // Ensure decoded JWT contains the required properties, including 'tier'
    const userPayload: UserPayload = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      tier: decoded.tier,  // 'tier' should be present in decoded token
    };

    // Type cast req.user to AuthRequest to include the correct user payload
    (req as AuthRequest).user = userPayload;
    next();
  });
};
