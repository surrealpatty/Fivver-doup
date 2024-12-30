import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types/customRequest'; // Ensure correct import
import { UserPayload } from '../types'; // Import the UserPayload interface

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
    res.status(401).json({ message: 'Access token is missing' });
    return;
  }

  // Ensure the JWT_SECRET environment variable is set
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ message: 'JWT_SECRET is not defined in the environment' });
    return;
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    // Attach the decoded user payload to the request object
    req.user = {
      id: decoded.id,
      email: decoded.email || undefined, // Ensure email is undefined if not present
      username: decoded.username || undefined, // Ensure username is undefined if not present
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired token
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
