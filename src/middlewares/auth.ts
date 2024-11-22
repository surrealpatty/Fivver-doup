import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config'; // Importing config for JWT_SECRET and JWT_EXPIRATION

// Access the secret and expiration from the config
const JWT_SECRET: string = config.JWT_SECRET; // Explicitly type as string
const JWT_EXPIRATION: string = config.JWT_EXPIRATION || '1h';  // Default expiration if not defined

// Type for the decoded JWT payload (customize as needed)
interface JwtPayload {
  id: string;
  [key: string]: any; // Add more properties if your JWT contains additional data
}

// Extend the Express Request interface to include userId (added by the JWT verification middleware)
// We'll use `string | undefined` since the `id` is a string in the JWT payload
interface CustomRequest extends Request {
  userId?: string;  // userId is string (to match the decoded JWT payload)
}

// Middleware to generate a JWT token
export const generateToken = (userId: string): string => {
  // Ensure that the JWT token is signed using the correct secret and expiration time
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

// Middleware to verify the JWT token
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];

  // If no token is provided, return a 403 error
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized', error: err.message });
    }

    // If the token is valid, set the user ID on the request object
    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      const decodedToken = decoded as JwtPayload; // Typecast the decoded token
      req.userId = decodedToken.id;  // Access decoded userId safely

      return next();  // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  });
};
