// controllers/reviewController.js
import { Review } from '../models/review.js'; // Use ES module syntax for consistency

// Create a new review
export const createReview = async (req, res) => {
    const { rating, comment, serviceId } = req.body; // Destructure required fields
    const userId = req.user.id; // Get user ID from the authenticated user

    // Ensure required fields are present
    if (!rating || !serviceId) {
        return res.status(400).json({ message: 'Rating and serviceId are required' });
    }

    try {
        const newReview = await Review.create({ rating, comment, userId, serviceId });
        return res.status(201).json(newReview);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating review', error: error.message });
    }
};

// Get reviews for a specific service
export const getReviewsForService = async (req, res) => {
    const { serviceId } = req.params;

    try {
        const reviews = await Review.findAll({ where: { serviceId } });
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};

// Update a review
export const updateReview = async (req, res) => {
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
        return res.status(500).json({ message: 'Error updating review', error: error.message });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
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
        return res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
};
