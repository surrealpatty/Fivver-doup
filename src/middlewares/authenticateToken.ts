// src/middlewares/authenticateToken.ts

import { CustomAuthRequest } from '../types';  // Import the correct type for request
import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';  // Assuming you have a utility to verify JWT
import { UserPayload } from '../types';  // Import the UserPayload interface

// Middleware to authenticate user token
const authenticateToken = (
  req: CustomAuthRequest,  // CustomAuthRequest type ensures req has user as optional
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
    // Attempt to verify and decode the token
    const decoded = verifyToken(token);  // Assuming verifyToken returns a decoded object

    // Ensure decoded is not null and has the expected structure
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach the decoded user info to the req object (user is typed as UserPayload)
    req.user = decoded.user as UserPayload;  // Casting decoded.user to UserPayload

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Catch any errors during token verification (invalid or expired token)
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken;  // Default export
