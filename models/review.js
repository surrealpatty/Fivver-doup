const express = require('express');
const router = express.Router();
const { Review } = require('../models'); // Ensure you're importing the Review model correctly

// Route for creating a review
router.post('/', async (req, res) => {
    try {
        const { rating, comment, userId, serviceId } = req.body;

        // Validate required fields
        if (rating == null || comment == null || userId == null || serviceId == null) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newReview = await Review.create({ rating, comment, userId, serviceId });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Changed to 500 for server errors
    }
});

// Route for retrieving all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Changed to 500 for server errors
    }
});

// Route for retrieving a review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Changed to 500 for server errors
    }
});

// Route for updating a review
router.put('/:id', async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update the review only if provided
        if (rating !== undefined) review.rating = rating;
        if (comment !== undefined) review.comment = comment;

        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Changed to 500 for server errors
    }
});

// Route for deleting a review
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await review.destroy();
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ error: error.message }); // Changed to 500 for server errors
    }
});

module.exports = router;
