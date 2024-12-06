// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Use relative path instead of @types

// Define the AuthRequest type to include the user object
export interface AuthRequest extends Request {
  user?: UserPayload; // The 'user' object is optional, matching the UserPayload structure
}

// Middleware to authenticate JWT and attach the decoded user to the request object
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.headers['authorization']?.split(' ')[1];  // Token is expected as "Bearer <token>"

  // If no token is provided, respond with a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token and decode it
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid' });  // Token is invalid
    }

    // Attach the decoded user payload to the request object (req.user)
    req.user = decoded as UserPayload; // Cast decoded object to UserPayload type
    next();  // Proceed to the next middleware or route handler
  });
};
