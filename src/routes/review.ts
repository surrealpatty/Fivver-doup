// src/routes/review.ts

import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types'; // Correct import of CustomAuthRequest

const router = Router();

// POST route to create a new review
router.post(
  '/',
  authenticateToken,
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user;

      if (!user) {
        res.status(401).json({ message: 'User not authenticated.' });
        return;
      }

      const { rating, comment, serviceId } = req.body;

      if (!rating || !comment || !serviceId) {
        res.status(400).json({ message: 'Rating, comment, and serviceId are required' });
        return;
      }

      // Logic to create a review (e.g., saving it in the database)
      // Example: await Review.create({ userId: user.id, rating, comment, serviceId });

      res.status(201).json({ message: 'Review created successfully.' });
    } catch (error) {
      next(error); // Pass errors to the error handler
    }
  }
);

// GET route to fetch reviews for a specific service
router.get(
  '/:serviceId',
  authenticateToken,
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user;

      if (!user) {
        res.status(401).json({ message: 'User not authenticated.' });
        return;
      }

      const { serviceId } = req.params;

      // Logic to fetch reviews for the service (e.g., querying the database)
      // Example: const reviews = await Review.findAll({ where: { serviceId } });

      res.status(200).json({ message: `Reviews for service ${serviceId} fetched successfully.` });
    } catch (error) {
      next(error); // Pass errors to the error handler
    }
  }
);

export default router;
