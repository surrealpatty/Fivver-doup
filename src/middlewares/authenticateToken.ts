// src/middlewares/authenticateToken.ts
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types'; // Ensure the path is correct

// Middleware to authenticate and verify the token
export const authenticateToken = (
  req: CustomAuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // Extract the token from the Authorization header
  const authHeader = req.headers?.authorization;
  const token = authHeader?.split(' ')[1]; // Extract the token after "Bearer"

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    res.status(401).json({ message: 'Access token is missing' });
    return; // Ensure no further code is executed
  }

  // Ensure the JWT_SECRET environment variable is set
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ message: 'JWT_SECRET is not defined in the environment' });
    return; // Ensure no further code is executed
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string; username: string };

    // Attach the decoded user payload to the request object (with null checks)
    req.user = {
      id: decoded.id,
      email: decoded.email ? decoded.email : '', // Provide a fallback value (empty string) if undefined
      username: decoded.username ? decoded.username : '', // Provide a fallback value (empty string) if undefined
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired token
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};