import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';  // Correct import for authenticateToken
import { AuthRequest } from '../types';  // Correct import for AuthRequest type

const router = Router();

// POST route to create a new review
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Ensure that the user is authenticated and has the necessary 'tier' property
    if (!req.user || !req.user.tier) {
      return res.status(400).json({ message: 'User tier is missing or user is not authenticated.' });
    }

    // Logic to create a review (e.g., saving it in the database)
    // Replace this with actual review creation logic

    return res.status(201).json({ message: 'Review created successfully.' });
  } catch (err) {
    next(err); // Pass errors to the error handler
    // Explicit return in case of an error, although next(err) would terminate the request processing
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET route to fetch reviews for a specific service
router.get('/:serviceId', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(400).json({ message: 'User not authenticated.' });
    }

    const serviceId = req.params.serviceId;

    // Logic to fetch reviews for the service (e.g., querying the database)
    // Replace this with actual review fetching logic

    return res.status(200).json({ message: `Reviews for service ${serviceId} fetched successfully.` });
  } catch (err) {
    next(err); // Pass errors to the error handler
    // Explicit return in case of an error, although next(err) would terminate the request processing
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
