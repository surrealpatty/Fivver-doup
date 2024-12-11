// src/middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';  // Import the AuthRequest interface
import { UserPayload } from '../types';  // Import UserPayload for typing

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Middleware to authenticate the user using a JWT token
export const authenticateToken = (
  req: AuthRequest,  
  res: Response,
  next: NextFunction
): void => {  
  const authorizationHeader = req.headers['authorization'] as string | undefined;

  if (!authorizationHeader) {
    res.status(401).json({ message: 'Authorization token is missing or invalid' });
    return;
  }

  const token = authorizationHeader.split(' ')[1]; // Token is expected in "Bearer token" format

  if (!token) {
    res.status(401).json({ message: 'Authorization token is missing' });
    return;
  }

  try {
    // Decode the token and ensure it's a valid UserPayload
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    req.user = decoded; // Set req.user to the decoded payload (UserPayload)

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
