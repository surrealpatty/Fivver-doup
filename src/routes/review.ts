import express, { Request, Response } from 'express';  // Import express and types for request and response
import {
    createReview,
    getReviewsForService,
    updateReview,
    deleteReview
} from '../controllers/reviewController'; // Assuming reviewController.ts is in controllers folder
import { authenticateToken } from '../middlewares/authMiddleware'; // Ensure correct import path

const router = express.Router();

// Route to create a new review (requires authentication)
router.post('/', authenticateToken, createReview);

// Route to get reviews for a specific service
router.get('/:serviceId', getReviewsForService);

// Route to update a review (requires authentication)
router.put('/:reviewId', authenticateToken, updateReview);

// Route to delete a review (requires authentication)
router.delete('/:reviewId', authenticateToken, deleteReview);

// Optional: Health check or confirmation route
router.get('/health', (req: Request, res: Response): Response => {
    return res.json({ message: 'Reviews route is working!' });
});

export default router;
