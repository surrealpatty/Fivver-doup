// src/middlewares/authenticateToken.ts

import { Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types'; // Import the correct type for the request
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library for verifying the JWT
import { UserPayload } from '../types'; // Import the UserPayload interface

// Middleware to authenticate user token
const authenticateToken = (
  req: CustomAuthRequest, // CustomAuthRequest ensures req has a user as required
  res: Response, 
  next: NextFunction
) => {
  // Check if token is present in the authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Get token from "Bearer <token>" format

  // If no token is provided, return 403 Forbidden response
  if (!token) {
    return res.status(403).json({ message: 'Token is missing' });
  }

  try {
    // Attempt to verify and decode the token using jsonwebtoken
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload; // Assuming JWT contains the UserPayload

    // Attach the decoded user info to the req object
    req.user = decoded;  // TypeScript knows req.user is a UserPayload

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Catch any errors during token verification (invalid or expired token)
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken; // Default export
