import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors, Jwt } from 'jsonwebtoken';
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

  // Define the options for JWT verification with `complete: true`
  const options: jwt.VerifyOptions = {
    algorithms: ['HS256'], // Specify the algorithm type correctly
    complete: true,         // Request full JWT (header + payload + signature)
  };

  try {
    // Verify the token with `complete: true`
    jwt.verify(token, SECRET_KEY, options, (err: VerifyErrors | null, decoded: Jwt | undefined) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      // Now `decoded` is a `Jwt` object, so we access `decoded.payload` for the payload
      if (decoded && decoded.payload) {
        req.user = decoded.payload as UserPayload;
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
