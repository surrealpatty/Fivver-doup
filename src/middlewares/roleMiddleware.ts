import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to enforce role-based access control.
 * @param requiredRole - The role required to access the route.
 */
export const checkRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Ensure `req.user` exists and contains a role
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated.' });
      return;  // Explicitly end the middleware without returning a value
    }

    // Check if the user's role matches the required role
    if (req.user.role !== requiredRole) {
      res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      return;  // Explicitly end the middleware without returning a value
    }

    // User has the required role; proceed to the next middleware or route handler
    next();
  };
};
