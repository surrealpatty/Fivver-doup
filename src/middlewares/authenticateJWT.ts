import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
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

  const options: jwt.VerifyOptions = {
    algorithms: ['HS256'], // Specify the algorithm type correctly
  };

  try {
    jwt.verify(token, SECRET_KEY, options, (err: Error | null, decoded: jwt.JwtPayload | string | undefined) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      if (typeof decoded === 'object' && decoded !== null) {
        req.user = decoded as UserPayload;
      } else {
        return res.status(401).json({ message: 'Invalid token structure' });
      }

      next();
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
