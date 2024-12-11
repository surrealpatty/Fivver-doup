// src/routes/dashboard.ts
import { Router, Request, Response, NextFunction } from 'express';
import  authenticateToken  from '../middlewares/authenticateToken';
import { AuthRequest } from '../types';  // Import AuthRequest interface

const router = Router();

// Update the route handler to handle 'user' being possibly undefined
router.get('/dashboard', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const user = req.user;  // The user property could be undefined

  if (!user) {
    // Handle the case where the user is not authenticated
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  try {
    // Proceed with logic assuming 'user' is defined
    res.status(200).json({ message: 'Welcome to your dashboard!', user });
  } catch (error) {
    next(error);
  }
});

export default router;
