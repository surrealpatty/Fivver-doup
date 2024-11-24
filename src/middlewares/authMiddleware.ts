import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Assuming you have the UserPayload interface

// Get JWT secret from environment variables
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error('JWT_SECRET is not set. Authentication will fail.');
}

/**
 * Middleware to authenticate the token provided in the Authorization header.
 * If the token is valid, the decoded payload is attached to `req.user`.
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;

    if (!token) {
      return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret as string) as UserPayload;

    // Attach the decoded payload to req.user
    req.user = decoded; // Ensure this matches your `UserPayload` type (e.g., { id, email, username })

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
