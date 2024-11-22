import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config'; // Importing config for JWT_SECRET and JWT_EXPIRATION

const JWT_SECRET: string = config.JWT_SECRET; 
const JWT_EXPIRATION: string = config.JWT_EXPIRATION || '1h';

interface JwtPayload {
  id: string;
  [key: string]: any;
}

interface CustomRequest extends Request {
  userId?: string;  // We specify string because that's what the JWT will return
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized', error: err.message });
    }

    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      const decodedToken = decoded as JwtPayload;
      req.userId = decodedToken.id;  // Assign the string ID to userId

      return next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  });
};
