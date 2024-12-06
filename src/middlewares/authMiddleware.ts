import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types';  // Make sure the path is correct

// Define the AuthRequest type to include the user
export interface AuthRequest extends Request {
  user?: UserPayload; // Now matches the UserPayload structure
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is sent in the Authorization header as "Bearer token"
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid' });
    }

    req.user = decoded as UserPayload; // Now matches the UserPayload structure
    next();
  });
};
