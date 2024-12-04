import express, { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';  // Corrected import

const router = express.Router();

// Example route to create a new review
router.post('/', authenticateJWT, (req: Request, res: Response, next: NextFunction): void => {
  // Your review creation logic
  res.status(201).json({ message: 'Review created successfully.' });
});

// Example route to get reviews for a service
router.get('/:serviceId', authenticateJWT, (req: Request, res: Response, next: NextFunction): void => {
  // Logic to fetch reviews for the service
  res.status(200).json({ message: 'Reviews fetched successfully.' });
});

// Update review route
router.put('/:reviewId', authenticateJWT, (req: Request, res: Response, next: NextFunction): void => {
  // Logic to update review
  res.status(200).json({ message: 'Review updated successfully.' });
});

// Delete review route
router.delete('/:reviewId', authenticateJWT, (req: Request, res: Response, next: NextFunction): void => {
  // Logic to delete review
  res.status(200).json({ message: 'Review deleted successfully.' });
});

export default router;
