import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Ensure this type defines the expected structure of the JWT payload

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
  // Extract the authorization header
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    // Log missing token for debugging purposes
    console.log('Authorization token is missing');
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  // Parse the token from "Bearer <token>" format
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    // Log missing token for debugging purposes
    console.log('Token is missing after Bearer keyword');
    return res.status(401).json({ message: 'Access token is missing' });
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
