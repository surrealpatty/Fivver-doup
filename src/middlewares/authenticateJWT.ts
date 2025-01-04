import { Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyOptions } from 'jsonwebtoken'; // Correctly import JwtPayload and VerifyOptions
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

  const options: VerifyOptions = {  // Correct type for options
    algorithms: ['HS256'], // Specify the algorithm type correctly
  };

  try {
    jwt.verify(token, SECRET_KEY, options, (err: Error | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      if (typeof decoded === 'object' && decoded !== null) {
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
