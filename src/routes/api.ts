// src/routes/api.ts (example)
import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types';  // Correct import path for AuthRequest

const router = Router();

router.post('/services', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  // Route logic
  try {
    // Example logic for creating a service
    res.status(200).json({ message: 'Service created successfully' });
  } catch (error) {
    next(error);  // Pass errors to the next error-handling middleware
  }
});

router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  // Route logic
  try {
    res.status(200).json({ profile: req.user });
  } catch (error) {
    next(error);  // Pass errors to the next error-handling middleware
  }
});

export default router;
