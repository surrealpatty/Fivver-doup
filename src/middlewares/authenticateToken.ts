// src/middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Import UserPayload from types

// Define the CustomAuthRequest interface with the email property as required
export interface CustomAuthRequest extends Request {
  user?: {
    id: string;
    email: string;  // Make email required
    username?: string;
  };
}

const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
  // Retrieve the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];

  // If no token is found, respond with an error
  if (!token) {
    res.status(401).json({ message: 'Token is missing' });
    return;  // Exit early to stop further processing
  }

  // Verify the token using JWT
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    // If the token is invalid or expired, respond with an error
    if (err) {
      res.status(403).json({ message: 'Token is invalid' });
      return;  // Exit early to stop further processing
    }

    // Ensure decoded is properly cast to UserPayload and attach to the request
    req.user = decoded as UserPayload;  // Cast decoded to UserPayload

    // Proceed to the next middleware or route handler
    next();  // No need to return anything, just call next()
  });
};

export default authenticateToken;
