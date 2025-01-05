import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';  // Use only the default import
import config from '../config/config';

// Extend Express' Request interface to include userId
interface AuthRequest extends Request {
  userId?: string; // Store userId extracted from the JWT
}

// Define the expected JWT payload structure
interface JwtPayloadCustom extends jwt.JwtPayload {
  id: string; // User ID stored in the JWT payload
}

// Utility function to get the configuration for the current environment
const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';

  if (env in config) {
    return config[env as keyof typeof config];
  }

  throw new Error(`Invalid NODE_ENV: ${env}`);
};

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

  const { JWT_SECRET } = getConfig();

  jwt.verify(
    token,
    JWT_SECRET,
    (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | undefined) => { // Use `VerifyErrors` and `JwtPayload` from `jwt`
      if (err) {
        return res.status(401).json({ message: 'Unauthorized', error: err.message });
      }

      if (decoded && typeof decoded === 'object' && 'id' in decoded) {
        const decodedToken = decoded as JwtPayloadCustom;
        req.userId = decodedToken.id; // Store the userId in the request object
        return next(); // Proceed to the next middleware
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
  );
};

// Function to generate a JWT for a user
export const generateToken = (userId: string): string => {
  const { JWT_SECRET, JWT_EXPIRATION } = getConfig();

  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
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
