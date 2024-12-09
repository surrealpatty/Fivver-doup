import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define the expected structure of the decoded JWT payload
interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: 'free' | 'paid';
}

// Middleware to verify JWT token
const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  // Check if token exists
  if (!token) {
    res.status(403).json({ message: 'Access denied, no token provided' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('JWT_SECRET is not configured in the environment variables');
    res.status(500).json({ message: 'Internal server error' });
    return;
  }

  // Verify token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Token is invalid' });
      return;
    }

    // Attach the decoded user data to the request object
    req.user = decoded as UserPayload;

    next(); // Proceed to the next middleware or route handler
  });
};

export default authenticateToken;
