import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the interface for the User object attached to the request
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  subscription: string;
}

// Extend the Request interface to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the `user` property to the request object
    }
  }
}

// Middleware to authenticate the token
export const authMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  // Extract token from Authorization header
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No authorization header provided.' });
  }

  // Extract the token from the Authorization header (format: "Bearer token")
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Ensure the JWT_SECRET environment variable is set
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined in the environment variables.');
    }

    // Verify token using JWT secret and decode it into the User interface
    const verifiedUser = jwt.verify(token, jwtSecret) as User;
    req.user = verifiedUser; // Attach verified user data to request for later use
    return next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error instanceof Error ? error.message : error);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// Middleware to authorize based on user role
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    // Check if the user's role matches the allowed roles
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    return next(); // Proceed to the next middleware or route handler
  };
};

// Middleware to check for subscription level (e.g., "Paid" subscription)
export const authorizeSubscription = (requiredSubscription: string) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    // Check if the user has the required subscription level
    if (!req.user || req.user.subscription !== requiredSubscription) {
      return res.status(403).json({ message: `Access denied: ${requiredSubscription} subscription required.` });
    }
    return next(); // Proceed to the next middleware or route handler
  };
};
