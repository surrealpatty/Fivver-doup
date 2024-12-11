// src/middlewares/authenticateToken.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/authMiddleware';
import { UserPayload } from '../types';  // Ensure UserPayload is correctly imported

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Access Denied: No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: string };

    req.user = {
      id: decoded.id,
      email: '', // Optional: Retrieve email from your data if needed
      username: '', // Optional: Retrieve username if needed
      tier: 'free',  // Ensure `tier` is always set here
      role: '', // Optional: Retrieve role if needed
    };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Access Denied: Invalid token' });
  }
};
