import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authMiddleware';  // Correctly typed AuthRequest if needed
import { UserPayload } from 'src/types/index'; // Correct path for your types


// Extend the Request interface locally
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
