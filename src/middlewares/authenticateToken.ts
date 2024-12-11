// src/middlewares/authenticateToken.ts

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/authMiddleware'; // Assuming AuthRequest is the custom request type
import { UserPayload } from '../types'; // Ensure UserPayload is correctly imported

// Explicitly define the return type as void
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, respond with 401 and stop further execution
  if (!token) {
    res.status(401).json({ message: 'Access Denied: No token provided' });  // Sending a response, no return value needed
    return; // Ensure the function terminates after sending the response
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: string };

    // Attach user info to the request object, ensuring 'tier' is present
    req.user = {
      id: decoded.id,
      email: '', // Replace with logic to retrieve email if available
      username: '', // Replace with logic to retrieve username if available
      tier: 'free', // Replace with logic to retrieve the user's tier if available
      role: '', // Optional field, replace with logic if needed
    } as UserPayload;  // Ensure the type matches UserPayload interface

    next();  // Continue to the next middleware or route handler
  } catch (err) {
    // If the token is invalid, respond with 401 and stop execution
    res.status(401).json({ message: 'Access Denied: Invalid token' });  // Same here
    return; // Ensure the function terminates after sending the response
  }
};
