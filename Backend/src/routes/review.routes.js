const express = require('express');
const router = express.Router();
const Review = require('../models/review'); // Adjust if path is different
const { body, validationResult } = require('express-validator'); // For input validation
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this is the correct path

// 1. Create a new review
router.post(
    '/',
    authMiddleware, // Protect the route
    [
        // Validate input data
        body('serviceId').isInt().withMessage('Service ID is required and must be an integer'),
        body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5'),
        body('comment').optional().isString().withMessage('Comment must be a string'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { serviceId, rating, comment } = req.body;

        try {
            const review = await Review.create({
                serviceId,
                userId: req.user.id, // Assuming req.user.id is the ID of the authenticated user
                rating,
                comment,
            });
            res.status(201).json(review);
        } catch (error) {
            console.error('Error creating review:', error.message);
            res.status(500).json({ message: 'Error creating review', error: error.message });
        }
    }
);

// 2. Get all reviews for a specific service
router.get('/service/:serviceId', async (req, res) => {
    const { serviceId } = req.params;

    try {
        const reviews = await Review.findAll({ where: { serviceId } });
        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this service' });
        }
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// 3. Update a review
router.put(
    '/:id',
    authMiddleware, // Protect the route
    [
        body('rating').optional().isFloat({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5'),
        body('comment').optional().isString().withMessage('Comment must be a string'),
    ],
    async (req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const review = await Review.findByPk(id);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            if (review.userId !== req.user.id) {
                return res.status(403).json({ message: 'Unauthorized to update this review' });
            }
            await review.update(req.body);
            res.json(review);
        } catch (error) {
            console.error('Error updating review:', error.message);
            res.status(500).json({ message: 'Error updating review', error: error.message });
        }
    }
);

// 4. Delete a review
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this review' });
        }
        await review.destroy();
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error.message);
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
});

module.exports = router;
