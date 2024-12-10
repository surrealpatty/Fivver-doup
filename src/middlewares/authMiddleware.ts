import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from './index';  // Import the UserPayload interface
import { Request } from 'express';
// Secret key for JWT verification, should be in environment variables for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key

// Middleware to authenticate token and attach user data to the request
export const authenticateToken = (
  req: Request,  // The request type
  res: Response,  // The response type
  next: NextFunction // The next middleware function
): Response<any, Record<string, any>> | void => { // Adjusted return type to allow both responses and void
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization" header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify the token and decode it to UserPayload type
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    // Attach user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
export interface AuthRequest extends Request {
  user?: UserPayload;  // Make sure req.user is typed as UserPayload
}