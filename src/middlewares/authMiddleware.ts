import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define a type for the `user` object that will be attached to the request
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; username: string }; // Adjust to match your JWT payload structure
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    // Verify the token using the secret key from the environment variable
    const secretKey = process.env.JWT_SECRET || 'fallback-secret-key'; // Use fallback if not defined
    const decoded = jwt.verify(token, secretKey) as { id: string; email: string; username: string };

    // Attach decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Optional: A simple middleware to check if the user is authenticated
export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    return res.status(403).json({ message: 'Access denied. No user found in request' });
  }
  next();
};
