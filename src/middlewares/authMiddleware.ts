import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Assuming you have the UserPayload interface

// Ensure JWT_SECRET exists
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error('JWT_SECRET is not set');
}

// Define your authenticateToken middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  try {
    // Verify the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, jwtSecret as string) as UserPayload;

    // Attach the user info to the request object (optional, for use in route handlers)
    req.user = decoded; // You can access this user info later in your route handlers (e.g., req.user.id)

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};
