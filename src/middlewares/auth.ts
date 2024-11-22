import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config'; // Importing config for JWT_SECRET and JWT_EXPIRATION

const JWT_SECRET: string = config.JWT_SECRET;
const JWT_EXPIRATION: string = config.JWT_EXPIRATION || '1h';

// Define the expected JWT Payload structure
interface JwtPayload {
  id: string;  // Keep as string for typical JWT payloads
  [key: string]: any;  // Allow for other properties in the JWT payload
}

// The `verifyToken` middleware to check JWT in headers
export const verifyToken = (req: Request, res: Response, next: NextFunction): Response<any> | void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized', error: err.message });
    }

    // Handle decoding and verifying the JWT payload
    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      const decodedToken = decoded as JwtPayload;
      
      // Add the userId to the Request object (which is now extended with userId in src/types/express.d.ts)
      req.userId = decodedToken.id;

      return next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  });
};

// Generate a token for the user
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};
