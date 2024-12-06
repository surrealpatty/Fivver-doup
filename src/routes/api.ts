import { Router, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';  // Correct import path
import { AuthRequest } from '@types';  // Should match the alias defined in tsconfig.json

const router = Router();

// Explicitly type the route handler as RequestHandler
router.post('/services', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Your service creation logic here
    res.status(200).json({ message: 'Service created successfully' });
  } catch (error) {
    next(error);  // Pass errors to the next error-handling middleware
  }
});

router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).send('Unauthorized');
      return;  // Return to stop execution
    }
    res.status(200).json({ profile: req.user });  // Safely access req.user
  } catch (error) {
    next(error);  // Pass errors to the next error-handling middleware
  }
});

export default router;
