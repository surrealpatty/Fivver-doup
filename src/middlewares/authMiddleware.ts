import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define a custom request interface that includes the user property
interface CustomRequest extends Request {
  user?: { id: string; email: string; username: string };
}

// Middleware to authenticate JWT and attach user data to the request object
export const authenticateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  return new Promise((resolve, reject) => {
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
      resolve(); // Complete the promise
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
      reject(); // Reject promise if token is invalid
    }
  });
};

// Optional: Middleware to check if the user is authenticated (user data is available in the request)
export const checkAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!req.user) {
      return res.status(403).json({ message: 'Access denied. No user found in request' });
    }

    next(); // Proceed to the next middleware or route handler
    resolve(); // Complete the promise
  });
};
