import { Router, Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types'; // Ensure the import path is correct
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// POST route to create a new review
router.post('/', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Ensure req.user is authenticated and has a tier
    if (req.user && req.user.tier) {
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
router.get('/:serviceId', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Ensure req.user is authenticated
    if (req.user) {
      // Logic to fetch reviews for the given serviceId (e.g., querying the database)
      res.status(200).json({ message: 'Reviews fetched successfully.' });
    } else {
      res.status(400).json({ message: 'User not authenticated.' });
    }
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
});

export default router;
