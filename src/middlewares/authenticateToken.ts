import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Adjust relative path

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Get the token from the Authorization header (expects format: "Bearer <token>")
  const token = req.headers['authorization']?.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  // Retrieve JWT secret from environment variables
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('JWT_SECRET is not configured in the environment variables');
    return res.status(500).json({ message: 'Internal server error' });
  }

  // Verify token asynchronously
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid' });
    }

    // Ensure decoded object matches the expected UserPayload structure
    const user = decoded as UserPayload;

    // Attach the decoded user data to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();  // Pass control to the next middleware
  });
};

export default authenticateToken;
