import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // Import jwt
import { Request } from 'express';
import { UserPayload } from '../types';

// Secret key for JWT verification, should be in environment variables for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Middleware to authenticate token and attach user data to the request
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization" header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  // Try to verify the token using jwt.verify
  try {
    // jwt.verify automatically accepts options, so we can type the function instead of the options object
    jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] }, (err: Error | null, decoded: object | string | undefined) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      // Check if the decoded token is an object and contains the user payload
      if (decoded && typeof decoded === 'object' && decoded !== null) {
        // Casting decoded to UserPayload
        req.user = decoded as UserPayload;  // Attach user payload to request
      } else {
        return res.status(401).json({ message: 'Invalid token structure' });
      }

      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
