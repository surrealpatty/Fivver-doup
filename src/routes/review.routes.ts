import { Router, Request, Response } from 'express';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware';
import {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
} from '@/controllers/reviewController'; // Ensure correct path and named exports

const router = Router();

// Route for creating a review (only authenticated users can create a review)
router.post('/create', authMiddleware, createReview);

// Route for getting all reviews or a specific review by ID
router.get('/', getReviews);

// Route for updating a review (only the user who created the review or admin can update it)
router.put('/:id', authMiddleware, authorizeRoles('user', 'admin'), updateReview);

// Route for deleting a review (only the user who created the review or admin can delete it)
router.delete('/:id', authMiddleware, authorizeRoles('user', 'admin'), deleteReview);

export default router;
