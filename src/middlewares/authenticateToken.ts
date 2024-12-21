import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types';  // Custom type for extended request
import { UserPayload } from '../types';  // User payload type for decoded token

// Middleware to authenticate and decode JWT token
export function authenticateToken(req: CustomAuthRequest, res: Response, next: NextFunction): void {
  // Extract the token from the Authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  // Verify the token using JWT secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      // If the token is invalid or expired, return a 403 Forbidden error
      return res.status(403).json({ message: 'Token is not valid' });
    }

    // If token is valid, attach the decoded user to the request object
    if (decoded) {
      req.user = decoded as UserPayload; // Ensure the decoded token matches the UserPayload type
      
      // Optionally, check if the decoded user contains the required fields like email
      if (!req.user.email) {
        return res.status(400).json({ message: 'User email is missing' });
      }
    } else {
      return res.status(403).json({ message: 'Invalid token structure' });
    }

    // Proceed to the next middleware or route handler
    return next();  // Ensure it only calls next if no error response is sent
  });
}
