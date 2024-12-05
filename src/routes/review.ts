// src/routes/review.ts

import express, { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';  // Correct import
import { AuthRequest } from '../types/authMiddleware'; // Import AuthRequest for typing

const router = express.Router();

// Example route to create a new review
router.post('/', authenticateJWT, (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Ensure req.user is defined and has a tier
  if (req.user && req.user.tier) {
    res.status(201).json({ message: 'Review created successfully.' });
  } else {
    res.status(400).json({ message: 'User tier is missing.' });
  }
});

// Example route to get reviews for a service
router.get('/:serviceId', authenticateJWT, (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Ensure req.user is defined
  if (req.user) {
    res.status(200).json({ message: 'Reviews fetched successfully.' });
  } else {
    res.status(400).json({ message: 'User not authenticated.' });
  }
});

export default router;
