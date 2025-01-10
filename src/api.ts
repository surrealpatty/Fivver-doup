import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express-serve-static-core'; // Correct import for Express types
import jwt from 'jsonwebtoken';
import { UserPayload } from './types/index'; // Ensure consistent import from 'index' file

// Middleware to authenticate the token
export const authenticateToken = (
  req: ExpressRequest,  // Using the correctly imported ExpressRequest type
  res: ExpressResponse, // Using the correctly imported ExpressResponse type
  next: NextFunction
): ExpressResponse<any, Record<string, any>> | void => {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token is missing or invalid' });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured in the environment variables');
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Decode the JWT and cast it to the UserPayload type
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;

    // Explicitly type the req.user as UserPayload
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Token authentication failed:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
