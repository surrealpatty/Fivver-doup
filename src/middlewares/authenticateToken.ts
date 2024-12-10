import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '@types';  // Correctly import UserPayload from the types directory

const jwtSecret = process.env.JWT_SECRET as string; // Assert type as string

if (!jwtSecret) {
  console.error('JWT_SECRET is not set. Authentication will fail.');
}

interface AuthRequest extends Request {
  user?: UserPayload; // Attach UserPayload to the request's user property
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {  // Change return type to Response or void
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;

    if (!token) {
      return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    req.user = decoded;  // Attach the decoded token to req.user

    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Authentication error:', error.message);
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    console.error('Unexpected error during authentication:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
