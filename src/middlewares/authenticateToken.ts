import { Response, NextFunction } from 'express';
import jwt, { VerifyOptions, JsonWebTokenError, JwtPayload } from 'jsonwebtoken'; // Correct imports for VerifyOptions and JsonWebTokenError
import { Request } from 'express';
import { UserPayload } from '../types'; // Import your custom UserPayload type

// Secret key for JWT verification, should be in environment variables for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Extend the Request interface to include 'user' property
interface AuthRequest extends Request {
  user?: UserPayload; // Adding user field to store user data after token verification
}

// Middleware to authenticate token and attach user data to the request
export const authenticateToken = (
  req: AuthRequest, // Use the extended AuthRequest interface
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization" header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  const options: VerifyOptions = {
    algorithms: ['HS256'], // Specify the algorithm type correctly
  };

  try {
    jwt.verify(token, SECRET_KEY, options, (err: JsonWebTokenError | null, decoded: JwtPayload | undefined) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      if (decoded && typeof decoded === 'object' && decoded !== null) {
        req.user = decoded as UserPayload; // Assign decoded user payload to the request object
      } else {
        return res.status(401).json({ message: 'Invalid token structure' });
      }

      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
