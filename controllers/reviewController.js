// controllers/reviewController.js
const { Review } = require('../models');
const { User } = require('../models');
const { Service } = require('../models');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { rating, comment, serviceId } = req.body;
        const userId = req.user.id; // Assuming you're using JWT to get the user's ID from the token

        const review = await Review.create({
            rating,
            comment,
            userId,
            serviceId,
        });

        return res.status(201).json(review);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get reviews for a service
exports.getReviewsForService = async (req, res) => {
    try {
        const { serviceId } = req.params;

        const reviews = await Review.findAll({
            where: { serviceId },
            include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
        });

        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        review.rating = rating;
        review.comment = comment;

        await review.save();

        return res.status(200).json(review);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await review.destroy();

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
