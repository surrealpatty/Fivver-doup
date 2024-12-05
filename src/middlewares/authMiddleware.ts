// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/authMiddleware';

// Assuming JWT_SECRET is the secret key used to sign JWT tokens
const JWT_SECRET = 'your_jwt_secret_key';

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Assuming the payload contains the user ID, email, username, and tier
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email?: string; username?: string; tier: string };

    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      tier: decoded.tier,
    };

    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
