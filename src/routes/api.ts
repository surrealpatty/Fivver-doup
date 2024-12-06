import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/authMiddleware';

const router = Router();

// Updated route handler with correct async signature
router.post('/services', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  if (!req.user) {
    res.status(403).json({ message: 'User not authenticated' });
    return; // Ensure flow terminates after returning the response
  }

  if (!req.user.tier) {
    res.status(400).json({ message: 'User tier is missing' });
    return; // Ensure flow terminates after returning the response
  }

  // Proceed with creating or updating the service logic here...
  res.status(201).json({ message: 'Service created successfully' });

  // If needed, you can also call next() to pass control to further middleware
});
