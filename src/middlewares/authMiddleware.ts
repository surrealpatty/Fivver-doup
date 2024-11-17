// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the interface for the User object attached to the request
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  subscription: string;
}

// Middleware to authenticate the token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No authorization header provided.' });
  }

  // Extract the token from the Authorization header (format: "Bearer token")
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined in the environment variables.');
    }

    // Verify token and decode it into the User object
    const verifiedUser = jwt.verify(token, jwtSecret) as User;
    req.user = verifiedUser; // Attach the verified user data to the request object

    return next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error instanceof Error ? error.message : error);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// Optionally, you can also export other middlewares like authorizeRoles or authorizeSubscription.
