// src/routes/review.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct import for authenticateToken
import { AuthRequest } from '../types'; // Correct import for AuthRequest type
import { Response, NextFunction } from 'express';

const router = Router();

// POST route to create a new review
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Ensure that the user is authenticated and has the necessary 'tier' property
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
router.get('/:serviceId', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Ensure the user is authenticated
    if (req.user) {
      const serviceId = req.params.serviceId;
      // Logic to fetch reviews for the service (e.g., querying the database)
      res.status(200).json({ message: `Reviews for service ${serviceId} fetched successfully.` });
    } else {
      res.status(400).json({ message: 'User not authenticated.' });
    }
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
});

export default router;
