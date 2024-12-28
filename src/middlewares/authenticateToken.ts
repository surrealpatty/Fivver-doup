import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Assuming you have the UserPayload interface

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
): void => {
  // Extract token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : undefined;

  if (!token) {
    res.status(401).json({ message: 'Access denied, no token provided.' });
    return; // End the function here if no token is provided
  }

  // Try to verify the token and attach the decoded payload to req.user
  try {
    const decoded = jwt.verify(token, jwtSecret as string) as UserPayload;
    req.user = decoded; // Attach decoded payload to req.user
    next(); // Proceed to next middleware or route handler
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Authentication error:', error.message);
      res.status(403).json({ message: 'Invalid or expired token.' });
    } else {
      // Handle unexpected errors
      console.error('Unexpected error during authentication:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
};
