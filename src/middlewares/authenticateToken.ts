import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Ensure proper type import

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use environment variable or fallback to default key

// Middleware to authenticate the user using a JWT token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<any, Record<string, any>> => { // Allow Response type as a valid return type
  const authorizationHeader = req.headers['authorization'] as string | undefined;

  if (!authorizationHeader) {
    // If no token is provided, send an error and stop further processing
    console.log('Authorization token is missing or invalid');  // Debugging log
    return res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }

  // Extract token from "Bearer token" format
  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    // If no token after "Bearer", send an error and stop further processing
    console.log('Authorization token is missing');  // Debugging log
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Decode the token and ensure it's a valid UserPayload type
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;
    console.log('Decoded user:', decoded);  // Debugging log

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log('Token verification failed:', error);  // Debugging log
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
