import express from 'express'; 
import {
    createReview,
    getReviewsForService,
    updateReview,
    deleteReview
} from '../controllers/reviewController'; // Assuming reviewController.js is in controllers folder
import authMiddleware from '../middlewares/authMiddleware'; // Ensure correct import path

const router = express.Router();

// Route to create a new review (requires authentication)
router.post('/', authMiddleware, createReview);

// Route to get reviews for a specific service
router.get('/:serviceId', getReviewsForService);

// Route to update a review (requires authentication)
router.put('/:reviewId', authMiddleware, updateReview);

// Route to delete a review (requires authentication)
router.delete('/:reviewId', authMiddleware, deleteReview);

// Optional: Health check or confirmation route
router.get('/health', (req, res) => {
    res.json({ message: 'Reviews route is working!' });
});

export default router; 