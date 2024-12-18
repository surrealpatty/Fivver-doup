import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types';  // Correct import path to the UserPayload interface

// Extend the Request interface to include the `user` property
interface CustomAuthRequest extends Request {
  user: UserPayload;  // Ensure that `user` is present and properly typed
}

// Middleware to check the user's role
export const checkRole = (requiredRole: string) => {
  return (req: CustomAuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user;  // `user` will always exist due to the custom type

    // Check if the user and role exist
    if (!user || !user.role) {
      res.status(403).json({ message: 'User role is missing or not authorized' });
      return;  // Early exit, don't proceed to next middleware
    }

    // Check if the user's role matches the required role
    if (user.role !== requiredRole) {
      res.status(403).json({ message: 'Forbidden: Insufficient role' });
      return;  // Early exit, don't proceed to next middleware
    }

    // Proceed to the next middleware or route handler
    next();  // No need to return anything here, Express handles the lifecycle
  };
};
