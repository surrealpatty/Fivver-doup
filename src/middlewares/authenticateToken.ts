import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types';  // Import AuthRequest type
import jwt from 'jsonwebtoken';  // Assuming you're using JWT for token authentication

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
  // Extract token from authorization header
  const token = req.headers['authorization']?.split(' ')[1];  // Assuming a Bearer token format

  // If no token, send Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the token with JWT
  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    // If verification fails, send Forbidden response
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Assign the user object to req.user if verification is successful
    req.user = user || undefined;  // Ensure user is assigned or undefined if invalid

    // Proceed to the next middleware or route handler
    next();
  });
};

export default authenticateToken;
