// src/middleware/authenticateToken.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';  // Correctly importing AuthRequest from src/types
import { UserPayload } from '../types';  // Import UserPayload from the types file

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Middleware to check if the user is authenticated
export const authenticateToken = (
  req: AuthRequest,  // Ensure req is typed as AuthRequest
  res: Response,
  next: NextFunction
): void => {
  const authorizationHeader = req.headers['authorization'] as string | undefined;

  if (!authorizationHeader) {
    // Send a response and do not return anything
    res.status(401).json({ message: 'Authorization token is missing or invalid' });
    return;  // Ensure no further code execution
  }

  const token = authorizationHeader.split(' ')[1]; // Assuming token is passed as "Bearer token"

  if (!token) {
    // Send a response and do not return anything
    res.status(401).json({ message: 'Authorization token is missing' });
    return;  // Ensure no further code execution
  }

  try {
    // Verify the token and set user payload
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    req.user = decoded;  // TypeScript now knows req.user is of type UserPayload

    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    // Send a response and do not return anything
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to ensure the user is present in the request
export const ensureUser = (
  req: AuthRequest,  // Ensure req is typed as AuthRequest
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    // Send a response and do not return anything
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;  // Ensure no further code execution
  }

  next();  // Proceed to the next middleware or route handler
};

export default authenticateToken;
