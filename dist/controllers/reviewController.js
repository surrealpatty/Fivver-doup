"use strict";
const { Review, User, Service } = require('../models'); // Import models
// Create a new review
exports.createReview = async (req, res) => {
    const { rating, comment, serviceId } = req.body;
    const userId = req.user.id; // Assuming user ID is retrieved from JWT in the request
    try {
        // Check if the service exists
        const serviceExists = await Service.findByPk(serviceId);
        if (!serviceExists) {
            return res.status(404).json({ error: 'Service not found' });
        }
        // Validate required fields
        if (rating === undefined || comment === undefined) {
            return res.status(400).json({ error: 'Rating and comment are required' });
        }
        // Validate rating is within acceptable range (1-5)
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }
        // Create the review
        const review = await Review.create({
            rating,
            comment,
            userId,
            serviceId,
        });
        return res.status(201).json(review);
    }
    catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
// Get reviews for a specific service
exports.getReviewsForService = async (req, res) => {
    const { serviceId } = req.params;
    try {
        // Check if the service exists
        const serviceExists = await Service.findByPk(serviceId);
        if (!serviceExists) {
            return res.status(404).json({ error: 'Service not found' });
        }
        // Fetch reviews for the service with user details
        const reviews = await Review.findAll({
            where: { serviceId },
            include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
        });
        return res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
// Update a review
exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id; // User ID from JWT
    try {
        // Find the review
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        // Authorization check
        if (review.userId !== userId) {
            return res.status(403).json({ error: 'You do not have permission to update this review' });
        }
        // Update fields if provided
        if (rating !== undefined) {
            // Validate rating is within acceptable range (1-5)
            if (rating < 1 || rating > 5) {
                return res.status(400).json({ error: 'Rating must be between 1 and 5' });
            }
            review.rating = rating;
        }
        if (comment !== undefined)
            review.comment = comment;
        await review.save();
        return res.status(200).json(review);
    }
    catch (error) {
        console.error('Error updating review:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
// Delete a review
exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.id; // User ID from JWT
    try {
        // Find the review
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        // Authorization check
        if (review.userId !== userId) {
            return res.status(403).json({ error: 'You do not have permission to delete this review' });
        }
        await review.destroy();
        return res.status(204).send(); // No content response
    }
    catch (error) {
        console.error('Error deleting review:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
