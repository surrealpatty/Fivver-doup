import jwt from 'jsonwebtoken'; // Default import
import { Response, NextFunction } from 'express';
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

  // Define options for token verification using jwt.VerifyOptions
  const options: jwt.VerifyOptions = {  // Correct type for options
    algorithms: ['HS256'],  // Specify the algorithm
  };

  try {
    // Use jwt.verify with the correct types
    jwt.verify(
      token,
      SECRET_KEY,
      options,
      (err: jwt.JsonWebTokenError | null, decoded: jwt.JwtPayload | undefined) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid or expired token' });
        }

        if (decoded) {
          req.user = decoded as UserPayload; // Attach user data to the request
        } else {
          return res.status(401).json({ message: 'Invalid token structure' });
        }

        next();  // Proceed to the next middleware
      }
    );
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
