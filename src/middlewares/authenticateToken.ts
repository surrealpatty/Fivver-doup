// src/middlewares/authenticateToken.ts

import { AuthRequest, UserPayload } from '../types';  // Correct import for AuthRequest and UserPayload
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable or fallback to default

// Middleware to authenticate token
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.header('Authorization'); // Retrieve token from the 'Authorization' header

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token not provided' });
  }

  try {
    // Verify the token, assuming the decoded value matches UserPayload or undefined
    const decoded = jwt.verify(token, secretKey) as UserPayload | undefined;

    // Assign decoded to req.user with type UserPayload or undefined
    req.user = decoded; // This will correctly handle undefined or a valid UserPayload

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' }); // Return the response on error
  }
};

// Middleware to check if the user is authenticated
export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  // Ensure req.user is defined
  if (!req.user) {
    return res.status(403).json({ message: 'User not authenticated' });
  }

  next(); // Proceed to the next middleware or route handler
};
