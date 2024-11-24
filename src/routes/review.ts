import express, { Request, Response, RequestHandler } from 'express'; 
import {
  createReview,
  getReviewsForService,
  updateReview,
  deleteReview
} from '../controllers/reviewController'; // Ensure correct import path
import { authenticateToken } from '../middlewares/authMiddleware'; // Ensure correct import path

const router = express.Router();

// Route to create a new review (requires authentication)
router.post('/', authenticateToken, createReview as RequestHandler);

// Route to get reviews for a specific service
router.get('/:serviceId', getReviewsForService as RequestHandler);

// Route to update a review (requires authentication)
router.put('/:reviewId', authenticateToken, updateReview as RequestHandler);

// Route to delete a review (requires authentication)
router.delete('/:reviewId', authenticateToken, deleteReview as RequestHandler);

// Optional: Health check or confirmation route
router.get('/health', (_req: Request, res: Response): void => {
  // Return the health check response with a message
  res.json({ message: 'Reviews route is working!' });
});

export default router;
