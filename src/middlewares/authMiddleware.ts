import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types'; // Correct import path for AuthRequest

// Middleware to authenticate JWT and attach the decoded user to the request object
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];  // Token is expected as "Bearer <token>"

  // If no token is provided, respond with a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });  // Returning Response here is fine
  }

  // Verify the token and decode it
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid' });  // Returning Response here is fine
    }

    // Attach the decoded user payload to the request object (req.user)
    req.user = decoded as AuthRequest['user']; // Cast decoded object to AuthRequest['user'] type
    next();  // Proceed to the next middleware or route handler
  });
};
