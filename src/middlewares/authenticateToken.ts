import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Assuming you have the UserPayload interface

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  // Throw an error if JWT_SECRET is not set to halt execution
  throw new Error('JWT_SECRET is not set. Authentication will fail.');
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
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;

  if (!token) {
    // If no token is provided, send a 401 Unauthorized response
    res.status(401).json({ message: 'Access denied, no token provided.' });
    return; // Return to ensure the function ends after response is sent
  }

  // Try to verify the token and attach the decoded payload to req.user
  try {
    const decoded = jwt.verify(token, jwtSecret) as UserPayload; // Decode the token using the secret
    req.user = decoded; // Attach the decoded payload to req.user
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    // Check if the error is related to JWT verification issues
    if (error instanceof jwt.JsonWebTokenError) {
      // Specifically handle JWT errors (e.g., invalid token)
      console.error('Authentication error - Invalid token:', error.message);
      res.status(403).json({ message: 'Invalid or expired token.' });
      return; // Ensure to return after sending response
    } else {
      // Handle unexpected errors (e.g., issues with token structure)
      console.error('Unexpected error during authentication:', error);
      res.status(500).json({ message: 'Internal server error.' });
      return; // Ensure to return after sending response
    }
  }
};
