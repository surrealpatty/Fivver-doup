import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define the expected structure of the decoded JWT payload
interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: 'free' | 'paid';
}

// Augment the Request interface to include the `user` property
declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}

// Middleware to verify JWT token
const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  // Check if token exists
  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  const jwtSecret = process.env.JWT_SECRET;

  // Ensure the JWT_SECRET is configured in the environment variables
  if (!jwtSecret) {
    console.error('JWT_SECRET is not configured in the environment variables');
    return res.status(500).json({ message: 'Internal server error' });
  }

  // Verify token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid' });
    }

    // Attach the decoded user data to the request object
    req.user = decoded as UserPayload;

    // Proceed to the next middleware or route handler
    next();
  });
};

export default authenticateToken;
