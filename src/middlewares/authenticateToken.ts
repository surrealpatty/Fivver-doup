// src/middlewares/authenticateToken.ts
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types';  // Import AuthRequest type
import jwt from 'jsonwebtoken';  // Assuming you're using JWT for token authentication

// Middleware to authenticate the token and add the user to the request
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];  // Assuming a Bearer token

  if (!token) {
    // If no token, return Unauthorized
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the token with JWT
  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      // If token verification fails, return Forbidden
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Assign the user to the request object (could be undefined if invalid)
    req.user = user || undefined;
    
    // Pass to the next middleware
    next();
  });
};

export default authenticateToken;
