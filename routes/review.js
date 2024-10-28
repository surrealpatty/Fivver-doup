// routes/review.js
const express = require('express');
const { createReview, getReviewsForService, updateReview, deleteReview } = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createReview); // Create a new review
router.get('/:serviceId', getReviewsForService); // Get reviews for a specific service
router.put('/:reviewId', authenticate, updateReview); // Update a review
router.delete('/:reviewId', authenticate, deleteReview); // Delete a review

module.exports = router;
