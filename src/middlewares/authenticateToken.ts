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
): void => {
  // Extract token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : undefined;

  if (!token) {
    // Respond with an error if the token is not present
    res.status(401).json({ message: 'Access denied, no token provided.' });
    return; // End the request-response cycle
  }

  if (!jwtSecret) {
    // Respond with an error if the JWT secret is missing
    res.status(500).json({ message: 'Internal server error: Missing JWT secret.' });
    return; // End the request-response cycle
  }

  // Verify the token asynchronously using jwt.verify
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      // If token is invalid or expired, respond with an error
      res.status(403).json({ message: 'Invalid or expired token.' });
      return; // End the request-response cycle
    }

    // Type assertion for decoded, as jwt.verify returns a string or JwtPayload
    if (decoded) {
      req.user = decoded as UserPayload; // Ensure decoded is assigned as UserPayload
      return next(); // Proceed to the next middleware or route handler
    }

    // If decoded is undefined, respond with an error
    res.status(403).json({ message: 'Invalid or expired token.' });
  });
};
