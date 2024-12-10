import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/index'; // Correctly import UserPayload

// Ensure JWT_SECRET is available in the environment variables
const jwtSecret = process.env.JWT_SECRET as string; // Assert type as string

if (!jwtSecret) {
  console.error('JWT_SECRET is not set. Authentication will fail.');
}

// Extend the Request interface to include user
interface AuthRequest extends Request {
  user?: UserPayload; // Ensure user can be UserPayload or undefined
}

/**
 * Middleware to authenticate the token provided in the Authorization header.
 * If the token is valid, the decoded payload is attached to `req.user`.
 */
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;

    if (!token) {
      res.status(401).json({ message: 'Access denied, no token provided.' });
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    // Attach the decoded payload to req.user
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Authentication error:', error.message);
      res.status(403).json({ message: 'Invalid or expired token.' });
      return;
    }

    // Fallback for cases when the error is not of type `Error`
    console.error('Unexpected error during authentication:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * Middleware to check if the user is authenticated.
 * It uses `authenticateToken` and adds additional checks if needed.
 */
export const checkAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  authenticateToken(req, res, () => {
    // Add any additional checks if needed
    if (req.user) {
      next(); // If authenticated, proceed to the next route handler
    } else {
      res.status(401).json({ message: 'Authentication failed.' });
    }
  });
};
