import { Router, Request, Response } from 'express';
import { Review } from '../models/review'; // Adjust the import path for your Review model
import authMiddleware from '../middlewares/authMiddleware'; // Assuming this is used to verify user authentication
import { UserRequest } from '../types'; // Assuming you have this custom request type for authenticated users

const router = Router();

// Route for getting all reviews of a user
router.get('/:userId/reviews', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // Get user ID from request params
    
    // Fetch all reviews related to the user
    const reviews = await Review.findAll({ where: { userId } });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this user.' });
    }

    return res.json(reviews); // Send reviews as response
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// Route for creating a new review
router.post('/reviews', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Assuming req.body contains review details
    const { rating, comment, reviewedUserId } = req.body;

    // Validate required fields
    if (!rating || !comment || !reviewedUserId) {
      return res.status(400).json({ message: 'Missing required fields: rating, comment, and reviewedUserId are required.' });
    }

    // Create new review associated with the logged-in user
    const newReview = await Review.create({
      rating,
      comment,
      userId: req.user.id, // Use authenticated user's ID
      reviewedUserId,
    });

    return res.status(201).json(newReview); // Return the newly created review
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// Route for updating a review
router.put('/reviews/:reviewId', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const reviewId = req.params.reviewId; // Get review ID from params
    const { rating, comment } = req.body; // Get new rating and comment from request body

    // Fetch the review to update
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Only allow the owner of the review to update it
    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own reviews.' });
    }

    // Update review details
    const updatedReview = await review.update({ rating, comment });

    return res.json(updatedReview); // Return updated review
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// Route for deleting a review
router.delete('/reviews/:reviewId', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const reviewId = req.params.reviewId; // Get review ID from params

    // Fetch the review to delete
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Only allow the owner of the review to delete it
    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own reviews.' });
    }

    // Delete review
    await review.destroy();

    return res.status(204).send(); // No content response after successful deletion
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

export default router;
