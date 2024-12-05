// src/routes/profile.ts

import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/authMiddleware'; // Correctly import the AuthRequest type

const router = Router();

// Profile route with authentication
router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction) => {
  // Check if req.user is not defined
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Destructure user data from req.user
  const { id, email, username, tier } = req.user; 

  // Return user profile in response
  return res.json({ id, email, username, tier });
});

export default router;
