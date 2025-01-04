import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Ensure this is the correct type for your JWT payload

// Define the secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

/**
 * Middleware to authenticate users via JWT token.
 * Attaches the decoded user information to the `req.user` property.
 */
export default function authenticateToken(
  req: Request & { user?: UserPayload }, // Ensure correct type for `user`
  res: Response,
  next: NextFunction
): Response | void {
  // Extract the token from the Authorization header (Bearer token format)
  const authHeader = req.header('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    console.error('Authorization token is missing'); // Log missing token for debugging
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify and decode the JWT
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    console.log('Decoded token:', decoded); // Log decoded token for debugging

    // Attach the decoded user information to the `req.user` object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification failed:', error); // Log verification failure
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}
