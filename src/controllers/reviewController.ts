import { Request, Response } from 'express';
import Review from '../models/review'; // Default import for Review model
import { User, Service } from '../models'; // Named imports for other models

// Create a Review
export const createReview = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId, rating, comment } = req.body;
    const userId = req.user?.id; // Ensure user ID is available from the token

    // Validate required fields
    if (!serviceId || typeof rating !== 'number' || !comment) {
        return res.status(400).json({
            message: 'Service ID, rating, and comment are required',
            error: 'Invalid input',
        });
    }

    // Ensure the user is authenticated
    if (!userId) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: 'User must be authenticated to create a review',
        });
    }

    try {
        // Check if the service exists
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Create the review
        const review = await Review.create({
            serviceId,
            userId,
            rating,
            comment,
        });

        return res.status(201).json({
            message: 'Review created successfully',
            review,
        });
    } catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
};

// Get Reviews for a Service
export const getReviewsForService = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId } = req.params;

    try {
        const reviews = await Review.findAll({
            where: { serviceId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email'], // Fetch specific user attributes
                },
            ],
        });

        return res.status(200).json({
            message: 'Reviews fetched successfully',
            reviews: reviews.length > 0 ? reviews : [],
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
};

// Update a Review
export const updateReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?.id;

    // Ensure the user is authenticated
    if (!userId) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: 'User not authenticated',
        });
    }

    // Ensure that at least one field is provided for update
    if (!rating && !comment) {
        return res.status(400).json({
            message: 'At least one of rating or comment is required to update',
        });
    }

    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Ensure the user can only update their own review
        if (review.userId !== userId) {
            return res.status(403).json({ message: 'You can only update your own review' });
        }

        // Update review fields only if they are provided
        review.rating = rating ?? review.rating;
        review.comment = comment ?? review.comment;
        await review.save();

        return res.status(200).json({
            message: 'Review updated successfully',
            review,
        });
    } catch (error) {
        console.error('Error updating review:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
};

// Delete a Review
export const deleteReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params;
    const userId = req.user?.id;

    // Ensure the user is authenticated
    if (!userId) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: 'User not authenticated',
        });
    }

    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Ensure the user can only delete their own review
        if (review.userId !== userId) {
            return res.status(403).json({ message: 'You can only delete your own review' });
        }

        await review.destroy();

        return res.status(200).json({
            message: 'Review deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
};
