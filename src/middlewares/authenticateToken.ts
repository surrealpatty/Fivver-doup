import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; // Ensure correct import of UserPayload

const secretKey = 'your-secret-key'; // Replace with your actual secret key

// Define the AuthRequest interface to extend Express' Request
export interface AuthRequest extends Request {
  user?: UserPayload; // Make user optional (UserPayload or undefined)
}

// Middleware to authenticate JWT token
export const authenticateJWT = async (
  req: AuthRequest, // Use AuthRequest type here
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from the authorization header (assuming "Bearer token")
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      // Verify token
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Token is not valid' });
        }

        // Type the decoded value as UserPayload
        req.user = decoded as UserPayload; // Ensure it matches UserPayload structure
        next(); // Proceed to the next middleware or route handler
      });
    } else {
      res.status(401).json({ message: 'Unauthorized, no token provided' });
    }
  } catch (error) {
    next(error); // Pass any error to the next error handler
  }
};
