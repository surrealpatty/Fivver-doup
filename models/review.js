const express = require('express');
const router = express.Router();
const { models } = require('../models'); // Ensure you're importing models correctly

// Example route for creating a review
router.post('/reviews', async (req, res) => {
    try {
        const { rating, comment, userId, serviceId } = req.body;
        const newReview = await models.Review.create({ rating, comment, userId, serviceId });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
