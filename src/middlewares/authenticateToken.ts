// src/middlewares/authenticateToken.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Import UserPayload type

// Custom type for request, extending the base Express Request type
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // 'user' is now optional, matching your needs
}

const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Get token from the Authorization header

  // If no token is found, return a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Decode the token using jwt.verify() and cast the result to UserPayload type
    const decoded = jwt.verify(token, 'your_jwt_secret') as UserPayload;  // Ensure decoded is typed as UserPayload

    // Check if the decoded token has all the necessary fields to create a valid UserPayload
    if (!decoded.email || !decoded.id) {
      return res.status(401).json({ message: 'Invalid token structure' });
    }

    // Assign the decoded user information to req.user
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();

  } catch (err) {
    console.error(err);  // Log any errors for debugging
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken;
