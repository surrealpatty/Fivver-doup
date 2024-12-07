// src/middlewares/roleMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types';  // Import UserPayload from the correct location

// Extend Request interface locally
interface AuthRequest extends Request {
  user?: UserPayload;  // Mark user as optional
}

const checkRole = (requiredRole: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !user.role) {
      return res.status(403).json({ message: 'User role is missing or not authorized' });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }

    next();  // Proceed if the user has the correct role
  };
};

export { checkRole };
