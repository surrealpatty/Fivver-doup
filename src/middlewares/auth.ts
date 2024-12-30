import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config'; // Assuming your config is properly set up
import { Request } from 'express';
import { CustomAuthRequest } from '../types'; // Use the correct relative path

// Define the expected JWT Payload structure
interface JwtPayload {
  id: string; // User ID stored in the JWT payload
  [key: string]: any; // Allow other optional properties in the payload
}

// Extend Express' Request interface to include userId
interface AuthRequest extends Request {
  userId?: string; // Store userId extracted from the JWT
}

// Middleware to verify the JWT
export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response<any> | void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the "Bearer token" format

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token using the secret from config
  jwt.verify(
    token,
    config.JWT_SECRET, // JWT_SECRET is already a string in the config
    (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | string | undefined) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized', error: err.message });
      }

      // Ensure decoded payload is valid and contains an ID
      if (decoded && typeof decoded === 'object' && 'id' in decoded) {
        const decodedToken = decoded as JwtPayload;
        req.userId = String(decodedToken.id); // Store the userId in the request object
        return next(); // Proceed to the next middleware
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
  );
};

// Function to generate a JWT for a user
export const generateToken = (userId: string): string => {
  return jwt.sign(
    { id: userId }, // Payload containing the user ID
    config.JWT_SECRET, // JWT_SECRET from config
    {
      expiresIn: config.JWT_EXPIRATION, // JWT_EXPIRATION from config
    }
  );
};

// Middleware to authenticate the user based on the JWT
export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response<any> | void => {
  if (!req.userId) {
    return res.status(403).json({ message: 'No valid token or userId found.' });
  }
  next(); // User authenticated, proceed to the next middleware or route handler
};
