import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomAuthRequest, UserPayload } from '../types';  // Corrected import path

// Middleware to authenticate a token
export const authenticateToken = (
  req: CustomAuthRequest,  // Use CustomAuthRequest for req type to handle the 'user' property
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];  // Get the authorization header
  const token = authHeader && authHeader.split(' ')[1];  // Extract the token from the header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token using the JWT secret
  jwt.verify(token, process.env.JWT_SECRET!, (err: jwt.JsonWebTokenError | null, decoded: JwtPayload | UserPayload | undefined) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    if (decoded) {
      // Type assertion ensures decoded is treated as UserPayload
      req.user = decoded as UserPayload;  
      next();  // Call next() to move to the next middleware or route handler
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  });
};
