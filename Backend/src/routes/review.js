import express from 'express';
import { createReview, getReviewsForService, updateReview, deleteReview } from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new review (requires authentication)
router.post('/', authMiddleware, createReview);

// Route to get reviews for a specific service
router.get('/:serviceId', getReviewsForService);
router.get('/', (req, res) => {
    res.json({ message: 'Reviews route works!' });
});

// Route to update a review (requires authentication)
router.put('/:reviewId', authMiddleware, updateReview);

// Route to delete a review (requires authentication)
router.delete('/:reviewId', authMiddleware, deleteReview);

export default router;
