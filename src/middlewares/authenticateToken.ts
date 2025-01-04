import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Ensure this is the correct type for your JWT payload

// Define the secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

/**
 * Middleware to authenticate users via JWT token.
 * Attaches the decoded user information to the `req.user` property.
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<any, Record<string, any>> => {
  // Extract the token from the Authorization header (Bearer token)
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    // Log missing token for debugging purposes
    console.log('Authorization token is missing');
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    // Log the decoded token for debugging purposes
    console.log('Decoded token:', decoded);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log token verification failure for debugging purposes
    console.log('Token verification failed:', error);

    // Return a 403 status if the token is invalid or expired
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
