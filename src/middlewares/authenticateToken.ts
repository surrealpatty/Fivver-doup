// src/middlewares/authenticateToken.ts
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types'; // Ensure the path is correct for your project
import { UserPayload } from '../types'; // Ensure this interface exists in your types

// Middleware to authenticate and verify the token
export const authenticateToken = (
  req: CustomAuthRequest, // Type the request to include the optional `user`
  res: Response,
  next: NextFunction
): void => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Extract the token after "Bearer"

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  // Ensure the JWT_SECRET environment variable is set
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ message: 'JWT_SECRET is not defined in the environment' });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    // Attach the decoded user payload to the request object
    req.user = {
      id: decoded.id,
      email: decoded.email || '', // Provide a fallback value (empty string) if undefined
      username: decoded.username || '', // Provide a fallback value (empty string) if undefined
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired token
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
