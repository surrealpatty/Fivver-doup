// src/middlewares/authenticateToken.ts

import { AuthRequest } from '../types';  // Ensure correct import
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';  // Use environment variable or fallback

// Middleware to authenticate token
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token not provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as UserPayload | undefined;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};
