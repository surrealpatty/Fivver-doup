import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest type
import { UserPayload } from '../types';  // Import UserPayload type

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';  // Secret key for JWT verification

// Middleware to authenticate the JWT token
export const authenticateToken = (
  req: CustomAuthRequest,  // Type the req object using CustomAuthRequest
  res: Response,
  next: NextFunction
): void => {
  // Extract the token from the Authorization header (format: "Bearer <token>")
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, respond with a 401 Unauthorized error
  if (!token) {
    res.status(401).json({ message: 'Access denied, token missing.' });
    return; // No need to return the response, just return to stop further code execution
  }

  try {
    // Verify and decode the token using the secret key from environment variables
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload; // Decode the token as UserPayload

    // Attach the user object to req.user (req.user will be typed as UserPayload or undefined)
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 400 Bad Request error
    res.status(400).json({ message: 'Invalid token.' });
  }
};
