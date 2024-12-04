import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Adjust the 'user' property to match the type definition in src/types/express/index.d.ts
interface CustomRequest extends Request {
  user?: { id: string; email: string; username: string };
}

// Export the middleware functions using the custom request interface
export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
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
export const checkAuth = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    return res.status(403).json({ message: 'Access denied. No user found in request' });
  }
  next();
};
