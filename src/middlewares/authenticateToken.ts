import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Ensure proper type import

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Middleware to authenticate the user using a JWT token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorizationHeader = req.headers['authorization'] as string | undefined;

  // Check if the Authorization header exists
  if (!authorizationHeader) {
    res.status(401).json({ message: 'Authorization token is missing or invalid' });
    return; // Ensure early return to prevent further code execution
  }

  // Extract the token from the Authorization header (expected in "Bearer token" format)
  const token = authorizationHeader.split(' ')[1]; 

  // If no token, return error
  if (!token) {
    res.status(401).json({ message: 'Authorization token is missing' });
    return; // Ensure early return
  }

  try {
    // Decode the token and ensure it's a valid UserPayload type
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload; // Assert type as UserPayload

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return; // Ensure early return in case of error
  }
};

// Middleware to check if the user has the 'paid' role
export const checkUserRole = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user as UserPayload; // Ensure req.user is of type UserPayload

  // Check if the user role is 'paid'
  if (user?.role !== 'paid') {
    res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
    return; // Ensure early return to prevent further code execution
  }

  // If role is valid, proceed to the next middleware or handler
  next();
};
