// src/middlewares/authenticateToken.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the expected structure of the decoded JWT payload
interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: 'free' | 'paid';
}

const authenticateToken = (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Get token from Authorization header (expects format: "Bearer <token>")
  const token = req.headers['authorization']?.split(' ')[1];

  return new Promise((resolve, reject) => {
    // Check if token exists
    if (!token) {
      return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    // Retrieve JWT secret from environment variables
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured in the environment variables');
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Verify token
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token is invalid' });
      }

      // Ensure decoded object matches the expected payload structure
      const user = decoded as UserPayload;

      // Attach the decoded user data to the request object
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
      resolve(); // Resolve the promise when next() is called
    });
  });
};

export default authenticateToken;
