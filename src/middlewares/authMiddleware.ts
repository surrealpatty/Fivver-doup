// src/middleware/authMiddleware.ts

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';  // Correct import for AuthRequest type
import { UserPayload } from '../types';  // Correct import for UserPayload type

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as UserPayload;

    if (!decoded.tier) {
      return res.status(401).json({ message: 'Access Denied: Missing tier information' });
    }

    req.user = {
      id: decoded.id,
      email: decoded.email || '',
      username: decoded.username || '',
      tier: decoded.tier,  // This is now guaranteed to exist
      role: decoded.role || '',
    };

    next();  // Continue to next middleware/route handler
  } catch (err) {
    return res.status(401).json({ message: 'Access Denied: Invalid token' });
  }
};

export default authenticateToken;
