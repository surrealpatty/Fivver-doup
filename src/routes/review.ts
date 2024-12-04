// src/routes/review.ts
import { Router, Request, Response, NextFunction } from 'express';
import { createReview, getReviewsForService, updateReview, deleteReview } from '../controllers/reviewController';  // Ensure correct import path
import { authenticateToken } from '../middlewares/authMiddleware';  // Adjust path as needed
import { AuthRequest } from '../types';  // Ensure correct import for AuthRequest type

const router = Router();

// Route to create a new review (requires authentication)
router.post(
  '/', 
  authenticateToken, 
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Assuming createReview function is implemented elsewhere in the controller
    createReview(req, res, next);
  }
);

// Route to get reviews for a specific service
router.get(
  '/:serviceId', 
  (req: Request, res: Response, next: NextFunction): void => {
    // Assuming getReviewsForService function is implemented elsewhere in the controller
    getReviewsForService(req, res, next);
  }
);

// Route to update a review (requires authentication)
router.put(
  '/:reviewId', 
  authenticateToken, 
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Assuming updateReview function is implemented elsewhere in the controller
    updateReview(req, res, next);
  }
);

// Route to delete a review (requires authentication)
router.delete(
  '/:reviewId', 
  authenticateToken, 
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Assuming deleteReview function is implemented elsewhere in the controller
    deleteReview(req, res, next);
  }
);

// Optional: Health check or confirmation route
router.get('/health', (_req: Request, res: Response): void => {
  res.json({ message: 'Reviews route is working!' });
});

export default router;
