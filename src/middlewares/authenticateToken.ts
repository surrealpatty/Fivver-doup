// src/middlewares/authenticateToken.ts
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types'; // Import AuthRequest type
import jwt from 'jsonwebtoken';

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
  const token = req.headers['authorization']?.split(' ')[1];  // Assuming Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user || undefined;  // Assign user or undefined if invalid
    next();
  });
};

export default authenticateToken;
