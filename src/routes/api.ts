// src/routes/api.ts
import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/authMiddleware';

const router = Router();

router.post('/services', authenticateJWT, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(403).json({ message: 'User not authenticated' });
  }

  // Make sure the 'tier' exists in req.user
  if (!req.user.tier) {
    return res.status(400).json({ message: 'User tier is missing' });
  }

  // rest of your route logic...
});
