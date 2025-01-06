import { UserPayload } from '../types';  // Correct import from index.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the structure of the JWT payload (user)
interface AuthRequest extends Request {
  user?: UserPayload;  // Ensure the user field is typed as UserPayload or undefined
}

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Middleware to authenticate token
export const authenticateToken = (
  req: AuthRequest,  // Use the extended AuthRequest interface
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  // Verify the token and decode the payload
  jwt.verify(token, SECRET_KEY, (err: Error | null, decoded: UserPayload | undefined) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach decoded user data to the request
    req.user = decoded; 

    // Proceed to the next middleware
    next();
  });
};
