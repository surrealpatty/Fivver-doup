import { AuthRequest } from '../types';  // Correctly importing AuthRequest type
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Importing the UserPayload type for decoded token

const secretKey = process.env.JWT_SECRET || 'your-secret-key';  // Fallback to a default secret key if not set in env

// Middleware to authenticate token
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
  const token = req.headers['authorization']?.split(' ')[1];  // Get token from 'Authorization' header

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token not provided' });  // If token is missing
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, secretKey) as UserPayload;  // Decode token and ensure it matches UserPayload
    req.user = decoded;  // Attach decoded user data to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });  // Handle invalid token error
  }
};
