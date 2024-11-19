import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware'; // Adjust if it’s the default export
import {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
export const reviewController = { /* implementation */ };


const router = Router();

// Route for creating a review (only authenticated users can create a review)
router.post('/create', authMiddleware, createReview);

// Route for getting all reviews or a specific review by ID
router.get('/', getReviews);

// src/middlewares/authMiddleware.ts, Line 10 (example)
export function authorizeRoles(...roles: string[]) {
    // Function logic here
  }
  

export default router;
