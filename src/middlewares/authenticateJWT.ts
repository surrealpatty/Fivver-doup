import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
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

  // Define the options for JWT verification without `complete: true`
  const options: jwt.VerifyOptions = {
    algorithms: ['HS256'], // Specify the algorithm type correctly
  };

  try {
    // Verify the token and get the decoded payload
    jwt.verify(token, SECRET_KEY, options, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      // Since `decoded` can be `string | JwtPayload`, we assert that it's `JwtPayload`
      if (typeof decoded === 'object' && decoded !== null) {
        req.user = decoded as UserPayload;  // Assert that decoded is of type UserPayload
      } else {
        return res.status(401).json({ message: 'Invalid token structure' });
      }

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
