// src/routes/api.ts
import { Router, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';  // Correct import path
import { AuthRequest } from '../types';  // Correct import path for AuthRequest

const router = Router();

router.post('/services', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({ message: 'Service created successfully' });
  } catch (error) {
    next(error);  // Pass errors to the next error-handling middleware
  }
});

router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({ profile: req.user });  // Access `req.user` safely
  } catch (error) {
    next(error);  // Pass errors to the next error-handling middleware
  }
});

export default router;
