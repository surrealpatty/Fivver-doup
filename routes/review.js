// routes/review.js
const express = require('express');
const { createReview, getReviewsForService, updateReview, deleteReview } = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new review
router.post('/', authenticate, createReview);

// Get reviews for a specific service
router.get('/:serviceId', getReviewsForService);

// Update a review
router.put('/:reviewId', authenticate, updateReview);

// Delete a review
router.delete('/:reviewId', authenticate, deleteReview);

module.exports = router;
