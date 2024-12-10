// src/middlewares/authMiddleware.ts

import { NextFunction, Response } from 'express';
import { AuthRequest } from './authenticateToken'; // Ensure correct import of AuthRequest
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Ensure correct import of UserPayload

// Middleware to authenticate token
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization'); // Retrieve token from the 'Authorization' header

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token not provided' });
  }

  try {
    // Verify the token, assuming the decoded value matches UserPayload or undefined
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as UserPayload | undefined;

    // Assign decoded to req.user with type UserPayload or undefined
    req.user = decoded; // This will correctly handle undefined or a valid UserPayload

    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
