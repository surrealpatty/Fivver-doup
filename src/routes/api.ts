import { Router, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';  // Correct import path
import { AuthRequest } from '@types';  // Should match the alias defined in tsconfig.json

const router = Router();

router.post('/services', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({ message: 'Service created successfully' });
    return;  // Explicitly return void to match function signature
  } catch (error) {
    next(error);  // Pass errors to the next error-handling middleware
  }
});

router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({ profile: req.user });  // Access `req.user` safely
    return;  // Explicitly return void to match function signature
  } catch (error) {
    next(error);  // Pass errors to the next error-handling middleware
  }
});

export default router;
