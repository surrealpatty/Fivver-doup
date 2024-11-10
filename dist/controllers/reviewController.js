"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Review, User, Service } = require('../models'); // Adjust path as necessary
// 1. Create a Review
exports.createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, rating, comment } = req.body;
    const { userId } = req.user; // Assuming userId is stored in the JWT payload
    // Validate input
    if (!serviceId || !rating || !comment) {
        return res.status(400).json({ message: 'Service ID, rating, and comment are required' });
    }
    try {
        // Check if the service exists
        const service = yield Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        // Create a new review
        const review = yield Review.create({
            serviceId,
            userId,
            rating,
            comment,
        });
        return res.status(201).json({ message: 'Review created successfully', review });
    }
    catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ message: 'Error creating review', error: error.message });
    }
});
// 2. Get Reviews for a Service
exports.getServiceReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req.params; // Get service ID from request params
    try {
        // Fetch all reviews for the given service
        const reviews = yield Review.findAll({
            where: { serviceId },
            include: [
                {
                    model: User,
                    attributes: ['username', 'email'], // Include relevant user details (exclude password)
                },
            ],
        });
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this service' });
        }
        return res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});
// 3. Update a Review
exports.updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params; // Get review ID from request params
    const { rating, comment } = req.body;
    const { userId } = req.user; // Assuming userId is stored in the JWT payload
    // Validate input
    if (!rating && !comment) {
        return res.status(400).json({ message: 'Rating or comment is required to update' });
    }
    try {
        // Find the review by ID
        const review = yield Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        // Ensure that the logged-in user is the one who wrote the review
        if (review.userId !== userId) {
            return res.status(403).json({ message: 'You can only update your own reviews' });
        }
        // Update the review fields (only update provided fields)
        if (rating)
            review.rating = rating;
        if (comment)
            review.comment = comment;
        // Save the updated review
        yield review.save();
        return res.status(200).json({ message: 'Review updated successfully', review });
    }
    catch (error) {
        console.error('Error updating review:', error);
        return res.status(500).json({ message: 'Error updating review', error: error.message });
    }
});
// 4. Delete a Review
exports.deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params; // Get review ID from request params
    const { userId } = req.user; // Assuming userId is stored in the JWT payload
    try {
        // Find the review by ID
        const review = yield Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        // Ensure that the logged-in user is the one who wrote the review
        if (review.userId !== userId) {
            return res.status(403).json({ message: 'You can only delete your own reviews' });
        }
        // Delete the review
        yield review.destroy();
        return res.status(200).json({ message: 'Review deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting review:', error);
        return res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
});
//# sourceMappingURL=reviewController.js.map