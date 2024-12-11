import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';  // Import your custom AuthRequest type
import { UserPayload } from '../types';  // Import UserPayload for typing

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';  // Replace with environment variable or config

// Middleware to authenticate the user using a JWT token
export const authenticateToken = (
  req: AuthRequest,  // Ensure req is typed as AuthRequest
  res: Response,
  next: NextFunction
): void => {
  // Extract the Authorization header
  const authorizationHeader = req.headers['authorization'] as string | undefined;

  if (!authorizationHeader) {
    // Send response without returning
    res.status(401).json({ message: 'Authorization token is missing or invalid' });
    return;  // Exit early, avoiding further execution
  }

  // Token is expected in "Bearer <token>" format
  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    // Send response without returning
    res.status(401).json({ message: 'Authorization token is missing' });
    return;  // Exit early, avoiding further execution
  }

  try {
    // Decode the token using jwt.verify, which returns a UserPayload
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired token error
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
