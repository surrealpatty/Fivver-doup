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
  // Extract token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : undefined;

  if (!token) {
    // Respond with an error if the token is not present
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  if (!jwtSecret) {
    // Respond with an error if the JWT secret is missing
    return res.status(500).json({ message: 'Internal server error: Missing JWT secret.' });
  }

  // Verify the token synchronously using jwt.verify
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      // If token is invalid or expired, respond with an error
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    // Attach the decoded payload to req.user
    req.user = decoded as UserPayload;

    // Proceed to the next middleware or route handler
    next();
  });
};
