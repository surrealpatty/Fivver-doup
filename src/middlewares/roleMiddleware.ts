// src/middlewares/roleMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from 'src/types/index';  // Ensure correct path

// Extend the Request interface locally to include user
interface CustomAuthRequest extends Request {
  user?: UserPayload;
}

// Middleware to check the role of the user
const checkRole = (requiredRole: string) => {
  return (req: CustomAuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;  // `user` can be undefined

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
