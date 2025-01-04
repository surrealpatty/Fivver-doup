import express, { Request, Response } from 'express';  // Import required types
import  { authenticateToken } from '../middlewares/authenticateToken';  // Middleware for token verification
import { UserPayload } from '../types';  // Import UserPayload interface

const router = express.Router();

// Example middleware to check user roles
const checkRole = (role: 'Free' | 'Paid') => {
  return (req: Request, res: Response, next: Function) => {
    const user = req.user as UserPayload;  // Type the user as UserPayload
    const userRole = user.role; // Now TypeScript knows that user has a 'role' property

    if (userRole !== role) {
      return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
    }
    next();
  };
};

// Premium service route for paid users only
router.get('/premium', authenticateToken, checkRole('Paid'), (req: Request, res: Response) => {
  res.status(200).json({ message: 'Premium service access granted.' });
});

export default router;
