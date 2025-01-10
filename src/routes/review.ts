// src/routes/review.ts

import { Router, Response, NextFunction, Request, RequestHandler } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { UserPayload } from '../types'; // Ensure correct import of UserPayload

const router = Router();

// Define a custom request type to extend Express's Request interface
interface CustomAuthRequest extends Request {
  user?: UserPayload; // Ensure the user property is typed correctly with UserPayload
}

// POST route to create a new review
const createReviewHandler: RequestHandler = async (
  req: CustomAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user; // Access the user property from the custom request type

    if (!user) {
      res.status(401).json({ message: 'User not authenticated.' });
      return; // Ensure the function returns here
    }

    if (!user.tier) {
      res.status(400).json({ message: 'User tier is missing.' });
      return; // Ensure the function returns here
    }

    const email = user.email ?? 'No email provided'; // Use nullish coalescing for fallback

    const { rating, comment, serviceId } = req.body;
    if (!rating || !comment || !serviceId) {
      res.status(400).json({ message: 'Rating, comment, and serviceId are required' });
      return; // Ensure the function returns here
    }

    // Logic to create a review (e.g., saving it in the database)
    // Example: await Review.create({ userId: user.id, review: comment, serviceId: serviceId });

    res.status(201).json({ message: 'Review created successfully.', userEmail: email });
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
};

// GET route to fetch reviews for a specific service
const getReviewsHandler: RequestHandler = async (
  req: CustomAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user; // Access the user property from the custom request type

    if (!user) {
      res.status(401).json({ message: 'User not authenticated.' });
      return; // Ensure the function returns here
    }

    const serviceId = req.params.serviceId;

    // Logic to fetch reviews for the service (e.g., querying the database)
    // Example: const reviews = await Review.findAll({ where: { serviceId: serviceId } });

    res.status(200).json({ message: `Reviews for service ${serviceId} fetched successfully.` });
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
};

// POST route to create a new review
router.post('/', authenticateToken, createReviewHandler);

// GET route to fetch reviews for a specific service
router.get('/:serviceId', authenticateToken, getReviewsHandler);

export default router;
