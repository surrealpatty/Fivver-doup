// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Correct path to UserPayload
import { AuthRequest } from '../types'; // Correct path to AuthRequest

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use your actual secret key

export const authenticateToken = (
  req: AuthRequest, // Use AuthRequest here
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => { // Return type updated
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is passed as "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' }); // Return a response if no token
  }

  try {
    // Verify the token and assign the decoded payload to UserPayload type
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    // Check if the decoded token contains the necessary information
    if (!decoded.id || !decoded.tier) {
      console.warn('User payload is missing required information');
      return res.status(400).json({ message: 'User payload is missing required information' });
    }

    // Attach the decoded user information to the request object for further use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next(); // Proceed to the next middleware without returning the Response
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
