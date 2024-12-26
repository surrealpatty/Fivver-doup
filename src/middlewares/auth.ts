import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/config'; // Named imports for JWT configuration

// Define the expected JWT Payload structure
interface JwtPayload {
  id: string; // Keep as string for typical JWT payloads
  [key: string]: any; // Allow for other properties in the JWT payload
}

// The `verifyToken` middleware to check JWT in headers
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> | void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => { // Explicitly typing err and decoded
    if (err) {
      return res
        .status(401)
        .json({ message: 'Unauthorized', error: err.message });
    }

    // Handle decoding and verifying the JWT payload
    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      const decodedToken = decoded as JwtPayload;

      // Cast decodedToken.id to number if necessary
      req.userId = Number(decodedToken.id); // Explicitly cast to number

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
