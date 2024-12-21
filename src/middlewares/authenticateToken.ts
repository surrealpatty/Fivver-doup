// src/middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Import UserPayload from types

// Define the CustomAuthRequest interface with the user property as optional (it will be added later)
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Make user optional, as it will be populated later
}

const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
  // Retrieve the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];

  // If no token is found, respond with an error
  if (!token) {
    res.status(401).json({ message: 'Token is missing' });  // Return the response directly
    return;  // Ensure no further processing occurs
  }

  // Verify the token using JWT
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    // If the token is invalid or expired, respond with an error
    if (err) {
      res.status(403).json({ message: 'Token is invalid or expired' });  // Return the response directly
      return;  // Ensure no further processing occurs
    }

    // If decoded is valid, ensure it's typed as UserPayload and attach to the request
    if (decoded) {
      req.user = decoded as UserPayload;  // Cast decoded to UserPayload
      return next();  // Proceed to the next middleware or route handler
    }

    // If decoded is missing user information
    res.status(400).json({ message: 'Missing user information in token' });  // Return the response directly
  });
};

export default authenticateToken;
