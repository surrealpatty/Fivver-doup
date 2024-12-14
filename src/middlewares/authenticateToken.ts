import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Import UserPayload for typing

// Secret key for JWT, fallback to a default if not set in environment variables
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';  // Use environment variable or config

// Middleware to authenticate the user using a JWT token
export const authenticateToken = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  // Extract the Authorization header
  const authorizationHeader = req.headers['authorization'] as string | undefined;

  if (!authorizationHeader) {
    // Send response if Authorization token is missing
    res.status(401).json({ message: 'Authorization token is missing' });
    return;  // Exit the middleware here without returning anything
  }

  // Token is expected in "Bearer <token>" format
  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    // Send response if token part is missing
    res.status(401).json({ message: 'Authorization token is missing' });
    return;  // Exit the middleware here without returning anything
  }

  try {
    // Verify the token using jwt.verify
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;  // Type assertion to UserPayload

    // Attach the decoded user data to the request object
    req.user = decoded;  // You can now access req.user in subsequent middlewares/routes

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Invalid or expired token:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
