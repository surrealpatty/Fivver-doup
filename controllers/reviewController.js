const { Review, User, Service } = require('../models'); // Import models

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { rating, comment, serviceId } = req.body;
        const userId = req.user.id; // Assuming you're using JWT to get the user's ID from the token

        // Check if the service exists before creating a review
        const serviceExists = await Service.findByPk(serviceId);
        if (!serviceExists) {
            return res.status(404).json({ error: 'Service not found' });
        }

        // Validate required fields
        if (!rating || !comment) {
            return res.status(400).json({ error: 'Rating and comment are required' });
        }

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

        // Check if the service exists before fetching reviews
        const serviceExists = await Service.findByPk(serviceId);
        if (!serviceExists) {
            return res.status(404).json({ error: 'Service not found' });
        }

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

        // Ensure the user is authorized to update the review
        const userId = req.user.id;
        if (review.userId !== userId) {
            return res.status(403).json({ error: 'You do not have permission to update this review' });
        }

        // Validate fields before updating
        if (rating !== undefined) review.rating = rating;
        if (comment !== undefined) review.comment = comment;

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

        // Ensure the user is authorized to delete the review
        const userId = req.user.id;
        if (review.userId !== userId) {
            return res.status(403).json({ error: 'You do not have permission to delete this review' });
        }

        await review.destroy();

        return res.status(204).send(); // No content to send back
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
