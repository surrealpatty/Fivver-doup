import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Review from '../models/review'; // Ensure correct import path for Review
import authMiddleware from '../middlewares/authMiddleware'; // Ensure correct import path for authMiddleware

const router = Router();

// 1. Create a new review
router.post(
  '/',
  authMiddleware, // Protect the route with authentication
  [
    // Validate input data
    body('serviceId').isInt().withMessage('Service ID is required and must be an integer'),
    body('rating')
      .isFloat({ min: 1, max: 5 })
      .withMessage('Rating must be a number between 1 and 5'),
    body('comment').optional().isString().withMessage('Comment must be a string'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { serviceId, rating, comment } = req.body;

    try {
      const review = await Review.create({
        serviceId,
        userId: req.user!.id, // Assuming req.user.id is the ID of the authenticated user
        rating,
        comment,
      });
      res.status(201).json(review); // Return the newly created review
    } catch (error) {
      console.error('Error creating review:', error.message);
      res.status(500).json({ message: 'Error creating review', error: error.message });
    }
  }
);

// 2. Get all reviews for a specific service
router.get('/service/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  try {
    const reviews = await Review.findAll({ where: { serviceId } });
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this service' });
    }
    res.json(reviews); // Return the reviews
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// 3. Update a review
router.put(
  '/:id',
  authMiddleware, // Protect the route
  [
    body('rating').optional().isFloat({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5'),
    body('comment').optional().isString().withMessage('Comment must be a string'),
  ],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const review = await Review.findByPk(id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      // Ensure the user is updating their own review
      if (review.userId !== req.user!.id) {
        return res.status(403).json({ message: 'Unauthorized to update this review' });
      }

      await review.update(req.body); // Update the review with the new data
      res.json(review); // Return the updated review
    } catch (error) {
      console.error('Error updating review:', error.message);
      res.status(500).json({ message: 'Error updating review', error: error.message });
    }
  }
);

// 4. Delete a review
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Ensure the user is deleting their own review
    if (review.userId !== req.user!.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this review' });
    }

    await review.destroy(); // Delete the review
    res.json({ message: 'Review deleted successfully' }); // Confirmation of deletion
  } catch (error) {
    console.error('Error deleting review:', error.message);
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
});

export default router;
