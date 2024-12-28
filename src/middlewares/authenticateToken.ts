import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Assuming the UserPayload interface is defined

// Retrieve JWT secret from environment variables and assert its type as string
const jwtSecret = process.env.JWT_SECRET as string | undefined;

if (!jwtSecret) {
  console.error('JWT_SECRET is not set. Authentication will fail.');
}

/**
 * Middleware to authenticate the token provided in the Authorization header.
 * If the token is valid, the decoded payload is attached to `req.user`.
 */
export const authenticateToken = (
  req: Request & { user?: UserPayload }, // Extend Request type to include user
  res: Response,
  next: NextFunction
): void => { // Ensure the return type is void (no Response object directly returned)
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : undefined;

    if (!token) {
      // Respond with an error if the token is not present
      res.status(401).json({ message: 'Access denied, no token provided.' });
      return; // Ensure we return after sending the response
    }

    if (!jwtSecret) {
      // Respond with an error if the JWT secret is missing
      res.status(500).json({ message: 'Internal server error: Missing JWT secret.' });
      return; // Ensure we return after sending the response
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    // Attach the decoded payload to req.user
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next(); // `next()` is used, not returning anything
  } catch (error) {
    // Handle errors properly, but DO NOT return the Response object directly
    if (error instanceof Error) {
      console.error('Authentication error:', error.message);
      res.status(403).json({ message: 'Invalid or expired token.' });
      return; // Ensure we return after sending the response
    }

    // Fallback for cases when the error is not of type `Error`
    console.error('Unexpected error during authentication:', error);
    res.status(500).json({ message: 'Internal server error.' });
    return; // Ensure we return after sending the response
  }
};
