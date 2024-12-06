// src/routes/api.ts
import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types'; // Ensure proper import

const router = Router();

// Updated route handler with correct async signature
router.post('/services', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      res.status(403).json({ message: 'User not authenticated' });
      return; // Ensure flow terminates after returning the response
    }

    // Ensure user has a tier assigned
    if (!req.user.tier) {
      res.status(400).json({ message: 'User tier is missing' });
      return; // Ensure flow terminates after returning the response
    }

    // Proceed with creating or updating the service logic here
    res.status(201).json({ message: 'Service created successfully' });

  } catch (error) {
    next(error); // Pass errors to the error handler
  }
});

export default router;
