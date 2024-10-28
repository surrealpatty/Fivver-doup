const express = require('express');
const router = express.Router();
const { Review } = require('../models'); // Ensure you are importing the Review model

// Create a new review
router.post('/', async (req, res) => {
    const { rating, comment, userId, serviceId } = req.body;

    try {
        const review = await Review.create({ rating, comment, userId, serviceId });
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [
                { model: User, as: 'user' },
                { model: Service, as: 'service' }
            ]
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id, {
            include: [
                { model: User, as: 'user' },
                { model: Service, as: 'service' }
            ]
        });
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a review
router.put('/:id', async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const [updated] = await Review.update(
            { rating, comment },
            { where: { id: req.params.id } }
        );

        if (updated) {
            const updatedReview = await Review.findByPk(req.params.id);
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a review
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Review.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
