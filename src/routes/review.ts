import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware'; // Correct middleware import
import { AuthRequest } from '../types'; // Correct import for AuthRequest

const router = Router();

// POST route to create a new review
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Ensure that the user is authenticated and has the necessary 'tier' property
    if (!req.user || !req.user.tier) {
      return res.status(400).json({ message: 'User tier is missing or user is not authenticated.' });
    }

    // Logic to create a review (e.g., saving it in the database)
    // Example: await Review.create({ userId: req.user.id, review: req.body.review, serviceId: req.body.serviceId });

    return res.status(201).json({ message: 'Review created successfully.' });
  } catch (err) {
    next(err); // Pass errors to the error handler
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
    // Example: const reviews = await Review.findAll({ where: { serviceId: serviceId } });

    return res.status(200).json({ message: `Reviews for service ${serviceId} fetched successfully.` });
  } catch (err) {
    next(err); // Pass errors to the error handler
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
