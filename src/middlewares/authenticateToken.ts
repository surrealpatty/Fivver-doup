import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Import UserPayload for typing

// Secret key for JWT, fallback to a default if not set in environment variables
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use environment variable or config

// Extend the Request interface to include `user` property
declare global {
  namespace Express {
    interface Request {
      user?: { // Ensure this matches the structure expected in your routes
        id: string;
        email?: string;
        username?: string;
      } | undefined; // Optional user object
    }
  }
}

// Middleware to authenticate the user using a JWT token
export const authenticateToken = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => { // No return value from this middleware
  // Extract the Authorization header
  const authorizationHeader = req.headers['authorization'] as string | undefined;

  if (!authorizationHeader) {
    // Send response if Authorization token is missing
    res.status(401).json({ message: 'Authorization token is missing' });
    return; // Just return after sending the response, no need for `next()`
  }

  // Token is expected in "Bearer <token>" format
  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    // Send response if token part is missing
    res.status(401).json({ message: 'Authorization token is missing' });
    return; // Just return after sending the response, no need for `next()`
  }

  try {
    // Verify the token using jwt.verify
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload; // Type assertion to UserPayload

    // Attach the decoded user data to the request object
    req.user = decoded; // You can now access req.user in subsequent middlewares/routes

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Invalid or expired token:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
