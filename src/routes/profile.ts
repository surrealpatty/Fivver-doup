// src/routes/profile.ts

import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/authMiddleware';

const router = Router();

router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  if (!req.user) {
    res.status(403).json({ message: 'User not authenticated' });
    return;  // Ensure flow terminates after returning the response
  }

  // Profile logic here...
  res.status(200).json({ profile: req.user });  // Send the profile
});
