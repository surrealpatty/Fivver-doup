const express = require('express');
const router = express.Router();
const { Review } = require('../models'); // Ensure you're importing the Review model correctly

// Route for creating a review
router.post('/', async (req, res) => {
    try {
        const { rating, comment, userId, serviceId } = req.body;

        // Validate required fields (optional)
        if (!rating || !comment || !userId || !serviceId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newReview = await Review.create({ rating, comment, userId, serviceId });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for retrieving all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for retrieving a review by ID (optional)
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for updating a review (optional)
router.put('/:id', async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update the review
        review.rating = rating !== undefined ? rating : review.rating; // Update only if provided
        review.comment = comment !== undefined ? comment : review.comment;

        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for deleting a review (optional)
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await review.destroy();
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
