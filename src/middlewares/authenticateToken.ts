import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Ensure this is the correct type for your JWT payload

// Define the secret key for JWT, falling back to a default value if not found in environment variables
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

/**
 * Middleware to authenticate users via JWT token.
 * Attaches the decoded user information to the `req.user` property.
 */
const authenticateToken = (
  req: Request & { user?: UserPayload }, // Ensure correct type for `user`
  res: Response,
  next: NextFunction
): Response | void => {
  // Extract the token from the Authorization header (Bearer token format)
  const authHeader = req.header('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  // If the token is missing, return an error response
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify and decode the JWT token using the secret key
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    // Attach the decoded user information to the `req.user` object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken; // Default export for use in route files
