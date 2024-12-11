// src/routes/review.ts
import express, { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct import for authenticateToken
import { AuthRequest } from '../types/authMiddleware'; // Correctly typed AuthRequest
import { UserPayload } from '../types'; // Correct path for your types

const router = Router();

// POST route to create a new review
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user && req.user.tier) { // req.user is guaranteed to be of type 'UserPayload' here
      // Logic to create a review (e.g., saving it in the database)
      res.status(201).json({ message: 'Review created successfully.' });
    } else {
      res.status(400).json({ message: 'User tier is missing.' });
    }
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
});

// GET route to fetch reviews for a specific service
router.get('/:serviceId', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user) { // req.user is guaranteed to be of type 'UserPayload' here
      const serviceId = req.params.serviceId;
      // Logic to fetch reviews for the service
      res.status(200).json({ message: 'Reviews fetched successfully.' });
    } else {
      res.status(400).json({ message: 'User not authenticated.' });
    }
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
});

export default router;
