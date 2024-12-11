// src/middleware/authenticateToken.ts
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';  // Import AuthRequest type
import { UserPayload } from '../types';  // Import UserPayload type

// Define the authenticateToken middleware
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Retrieve the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    res.status(401).json({ message: 'Access Denied: No token provided' });
    return;  // Return to stop further code execution
  }

  try {
    // Decode the token using jwt and cast the decoded token to UserPayload
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as UserPayload;

    // Ensure that decoded contains the expected properties
    if (!decoded.tier) {
      res.status(401).json({ message: 'Access Denied: Missing tier information' });
      return;  // Return to stop further code execution
    }

    // Attach the decoded user information to req.user
    req.user = {
      id: decoded.id,
      email: decoded.email || '',  // Fallback to empty string if email is missing
      username: decoded.username || '',  // Fallback to empty string if username is missing
      tier: decoded.tier,  // tier is now guaranteed to exist
      role: decoded.role || '',  // Optional: Include role if necessary
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return a 401 Unauthorized response
    res.status(401).json({ message: 'Access Denied: Invalid token' });
  }
};
