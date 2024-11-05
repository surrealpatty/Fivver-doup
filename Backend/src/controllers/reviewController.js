// controllers/reviewController.js
const { Review } = require('../models/review'); // Import the Review model

// Create a new review
exports.createReview = async (req, res) => {
    const { rating, comment, serviceId } = req.body; // Destructure required fields
    const userId = req.user.id; // Get user ID from the authenticated user

    if (!rating || !serviceId) { // Ensure required fields are present
        return res.status(400).json({ message: 'Rating and serviceId are required' });
    }

    try {
        const newReview = await Review.create({ rating, comment, userId, serviceId });
        return res.status(201).json(newReview);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Get reviews for a specific service
exports.getReviewsForService = async (req, res) => {
    const { serviceId } = req.params;

    try {
        const reviews = await Review.findAll({ where: { serviceId } });
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Update only if the user is the owner of the review
        if (review.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You do not own this review' });
        }

        // Update fields only if they are provided
        if (rating !== undefined) {
            review.rating = rating; // Update rating if provided
        }
        if (comment !== undefined) {
            review.comment = comment; // Update comment if provided
        }

        await review.save();
        return res.status(200).json(review);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Only allow the user who created the review to delete it
        if (review.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You do not own this review' });
        }

        await review.destroy();
        return res.status(204).send(); // No content
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
