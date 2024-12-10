import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/index';  // Correctly import UserPayload from the types directory


// Define the middleware function
const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract the token

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' }); // Send response directly
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('JWT_SECRET is not configured');
    return res.status(500).json({ message: 'Internal server error' }); // Send response directly
  }

  // Verify token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid' });
    }

    const user = decoded as UserPayload;  // Ensure the decoded token matches the UserPayload

    req.user = user;  // Attach user to request object

    next();  // Pass control to the next middleware
  });
};

export default authenticateToken;
