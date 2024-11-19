import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware'; // Ensure correct import
import { reviewController } from '../controllers/reviewController'; // Import controller functions

const router = Router();

// Route for creating a review (only authenticated users can create a review)
router.post('/create', authMiddleware, reviewController.createReview);

// Route for getting all reviews or a specific review by ID
router.get('/', reviewController.getReviews);

// Route for updating a review (only the user who created the review or an admin can update it)
router.put(
  '/:id',
  authMiddleware,
  reviewController.updateReview
);

// Route for deleting a review (only the user who created the review or an admin can delete it)
router.delete(
  '/:id',
  authMiddleware,
  reviewController.deleteReview
);

export default router;
