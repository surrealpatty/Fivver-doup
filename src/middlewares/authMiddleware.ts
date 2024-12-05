// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/authMiddleware'; // Correctly import types

const JWT_SECRET = 'your_jwt_secret_key';  // Use your JWT secret key

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract Bearer token

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Ensure the decoded token matches the UserPayload type, including the tier
    req.user = {
      id: decoded?.id as string,
      email: decoded?.email as string | undefined,
      username: decoded?.username as string | undefined,
      tier: decoded?.tier as string,  // Ensure `tier` is always present
    };

    next();
  });
};
