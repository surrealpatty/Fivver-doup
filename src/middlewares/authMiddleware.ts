import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types/authMiddleware'; // Adjust import if necessary

// Middleware to authenticate JWT and attach user data (including 'tier') to the request object
export const authenticateJWT = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Decode the token, assuming the payload contains 'id', 'email', 'username', and 'tier'
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, email: string, username: string, tier: string };

    // Attach decoded user information (including tier) to the request object
    req.user = { 
      id: decoded.id, 
      email: decoded.email, 
      username: decoded.username, 
      tier: decoded.tier 
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
