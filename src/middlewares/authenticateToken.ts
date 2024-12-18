import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';  // Add JwtPayload for better type inference
import { CustomAuthRequest, UserPayload } from '../types'; // Correct import for CustomAuthRequest and UserPayload

// Middleware to authenticate a token
export const authenticateToken = (
  req: CustomAuthRequest, // Use CustomAuthRequest for req type
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']; // Get the authorization header
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET!, (err, user: JwtPayload | UserPayload | undefined) => {  // Allow undefined
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Type assertion to cast user to UserPayload
    if (user) {
      req.user = user as UserPayload; // Ensure user matches the UserPayload structure
      next();
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  });
};
