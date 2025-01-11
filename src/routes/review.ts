// src/routes/review.ts

import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types'; // Ensure this import path matches exactly with where CustomAuthRequest is defined

const router = express.Router();

// Example route to fetch a review
router.get(
  '/review',
  authenticateToken, // Middleware to authenticate user
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user;

      if (!user) {
        res.status(401).json({ message: 'User not authenticated' });
        return; // Return early to ensure no further code executes
      }

      res.status(200).json({
        message: 'Review fetched successfully',
        review: {
          // Example review data (you should replace this with actual review logic)
          userId: user.id,
          content: 'This is a sample review.',
        },
      });
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  }
);

export default router;
