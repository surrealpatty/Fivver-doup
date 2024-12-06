// src/routes/api.ts
import { Router, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';  // Correct import path
import { AuthRequest } from '@types';  // Make sure this alias is correctly set in tsconfig.json

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

// Define the /profile route with correct typing
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
