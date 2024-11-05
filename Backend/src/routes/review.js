const express = require('express');
const router = express.Router();

// Importing controller functions
const {
    createReview,
    getReviewsForService,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController');

// Importing authentication middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Route to create a new review
router.post('/', authMiddleware, createReview);

// Route to get reviews for a specific service
router.get('/:serviceId', getReviewsForService);

// Route to update a review
router.put('/:reviewId', authMiddleware, updateReview);

// Route to delete a review
router.delete('/:reviewId', authMiddleware, deleteReview);

// Exporting the router
module.exports = router;
