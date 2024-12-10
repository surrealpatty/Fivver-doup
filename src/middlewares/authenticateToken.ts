// src/middlewares/authenticateToken.ts

import { AuthRequest } from '../types/authMiddleware';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/index'; // Import UserPayload type

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // If no token is provided, respond with 401 and stop further execution
  if (!token) {
    res.status(401).json({ message: 'Access Denied: No token provided' });
    return;  // Make sure to return here to stop further execution
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: string };
    
    // Attach user info to the request object
    req.user = {
      id: decoded.id,
      email: '', // Replace with actual logic to retrieve the email
      username: '', // Replace with actual logic to retrieve the username
      tier: 'free', // Replace with actual logic to retrieve the tier (or use the appropriate logic for tier)
      role: '', // Optional field
    } as UserPayload;  // Ensure the type matches UserPayload interface

    next();  // Continue to the next middleware or route handler
  } catch (err) {
    // If the token is invalid, respond with 401
    res.status(401).json({ message: 'Access Denied: Invalid token' });
  }
};
