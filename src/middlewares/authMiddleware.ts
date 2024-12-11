// src/middleware/authMiddleware.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';  // Importing the correct AuthRequest type
import { UserPayload } from '../types';  // Importing the correct UserPayload type

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Verify the token and decode it as UserPayload
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as UserPayload;

    // Check if 'tier' exists in the decoded payload, which is required
    if (!decoded.tier) {
      return res.status(401).json({ message: 'Access Denied: Missing tier information' });
    }

    // Assign the decoded user information to req.user
    req.user = {
      id: decoded.id,
      email: decoded.email || '',    // Fallback to empty string if email is missing
      username: decoded.username || '',  // Fallback to empty string if username is missing
      tier: decoded.tier,            // Tier is now guaranteed to exist
      role: decoded.role || '',      // Fallback to empty string if role is missing
    };

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return a 401 Unauthorized error
    return res.status(401).json({ message: 'Access Denied: Invalid token' });
  }
};

export default authenticateToken;
