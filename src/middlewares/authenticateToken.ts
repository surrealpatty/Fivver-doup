import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';  // Importing JwtPayload for the 'user' type
import { CustomAuthRequest, UserPayload } from '../types'; // Correct import for CustomAuthRequest and UserPayload

// Middleware to authenticate a token
export const authenticateToken = (
  req: CustomAuthRequest,  // Use CustomAuthRequest for req type
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']; // Get the authorization header
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: JwtPayload | UserPayload) => {  // Explicit types for 'err' and 'user'
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Type assertion to ensure 'user' is of type 'UserPayload'
    req.user = user as UserPayload; // Ensure user matches the UserPayload structure
    next();
  });
};
