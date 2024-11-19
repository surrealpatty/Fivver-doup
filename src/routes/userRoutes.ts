import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware';
import Review from '../models/review';
import User from '../models/user';

// Create router instance
const router = Router();

// Extend the Request interface to include user information
interface UserRequest extends Request {
  user: User;  // Assuming 'User' is the type for authenticated user
}

// Get all reviews for a user (GET /reviews/:userId)
router.get('/reviews/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { reviewedUserId: req.user?.id as number }, // Ensure type matching
      include: [{ model: User, as: 'user', attributes: ['username'] }],  // Assuming you want to include reviewer's username
    });

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    res.json({ reviews });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching reviews:', error.message);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } else {
      console.error('Unknown error occurred:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

// Add a review for a user (POST /reviews)
router.post(
  '/reviews',
  [
    body('reviewedUserId').isInt().withMessage('Reviewed user ID must be an integer'),
    body('content').isString().isLength({ min: 1 }).withMessage('Review content is required'),
  ],
  authMiddleware,  // Make sure the user is authenticated before posting a review
  where: { reviewedUserId: req.user?.id }, // Ensure this line ends properly
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reviewedUserId, content } = req.body;
    const userId = req.user?.id;  // Get the user ID from the request user object

    if (userId === reviewedUserId) {
      return res.status(400).json({ message: 'You cannot review yourself' });
    }

    try {
      // Create a new review
      const newReview = await Review.create({
        userId: userId,  // The user who is writing the review
        where: { reviewedUserId: req.user?.id as number }, // Ensure type matching
        content: content,
      });

      res.status(201).json({
        message: 'Review created successfully',
        review: newReview,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating review:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
      } else {
        console.error('Unknown error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
);

export default router;
