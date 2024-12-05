// src/middlewares/authMiddleware.ts

import { Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';  // Import JwtPayload to type the decoded token correctly
import { AuthRequest } from '../types/authMiddleware'; // Import the correct type for request
import jwt from 'jsonwebtoken';

// Define your JWT secret key
const JWT_SECRET = 'your_jwt_secret_key';  // Replace with your actual secret key

// Middleware to authenticate JWT token
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];  // Bearer token
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token and decode it
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Ensure decoded is typed as JwtPayload, and assert as UserPayload for proper typing
    const decodedPayload = decoded as JwtPayload & { id: string; email?: string; username?: string; tier: string };

    // Attach the user data to the request object
    req.user = {
      id: decodedPayload.id,
      email: decodedPayload.email,
      username: decodedPayload.username,
      tier: decodedPayload.tier,  // Ensure 'tier' is present
    };

    next();
  });
};
