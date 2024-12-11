import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types'; // Import AuthRequest to include user typing
import { UserPayload } from '../types'; // Ensure UserPayload is imported

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Middleware to check if the user is authenticated
export const authenticateToken = (
  req: AuthRequest,  // Ensure req is typed as AuthRequest
  res: Response,
  next: NextFunction
): void => {
  const authorizationHeader = req.headers['authorization'] as string | undefined;

  if (!authorizationHeader) {
    res.status(401).json({ message: 'Authorization token is missing or invalid' });
    return;
  }

  const token = authorizationHeader.split(' ')[1]; // Assuming token is passed as "Bearer token"

  if (!token) {
    res.status(401).json({ message: 'Authorization token is missing' });
    return;
  }

  try {
    // Verify the token and set user payload
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;
    req.user = decoded; // Explicitly set req.user as UserPayload

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
};
