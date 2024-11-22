import { Request, Response } from 'express';
import { Review, User, Service } from '../models';  // Correctly import models
import { checkAuth } from '../middlewares/authMiddleware'; // Import the checkAuth middleware

// Middleware to ensure user is authenticated
export const ensureAuthenticated = checkAuth; // Reuse checkAuth as a middleware for routes

/**
 * Create a Review
 */
export const createReview = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId, rating, comment } = req.body;
    const userIdAsString = req.user?.id; // Keep userId as string (UUID)

    // Input validation
    if (!serviceId || typeof rating !== 'number' || !comment) {
        return res.status(400).json({
            message: 'Service ID, rating, and comment are required',
            error: 'Invalid input',
        });
    }

    // Check if userId is valid
    if (!userIdAsString) {
        return res.status(400).json({
            message: 'Invalid userId',
            error: 'User ID must be provided',
        });
    }

    try {
        const service = await Service.findByPk(serviceId); // Check if the service exists
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Create the review
        const review = await Review.create({
            serviceId,
            userId: userIdAsString,  // Store the userId as string (UUID)
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

/**
 * Get Reviews for a Service
 */
export const getReviewsForService = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId } = req.params;

    try {
        const reviews = await Review.findAll({
            where: { serviceId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email'], // Include user details
                },
            ],
        });

        return res.status(200).json({
            message: 'Reviews fetched successfully',
            reviews: reviews.length > 0 ? reviews : [],  // Return an empty array if no reviews found
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
};

/**
 * Update a Review
 */
export const updateReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Ensure the user is authenticated
    const user = req.user; // Extract authenticated user from middleware
    if (!user || !user.id) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: 'User not authenticated',
        });
    }

    const userIdAsString = user.id;  // Keep userId as string (UUID)

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

        // Only allow updating reviews by the user who created the review
        if (review.userId !== userIdAsString) {
            return res.status(403).json({ message: 'You can only update your own review' });
        }

        // Update the review
        review.rating = rating ?? review.rating;  // Update rating if provided, else keep existing
        review.comment = comment ?? review.comment;  // Update comment if provided, else keep existing
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

/**
 * Delete a Review
 */
export const deleteReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params;

    // Ensure the user is authenticated
    const user = req.user; // Extract authenticated user from middleware
    if (!user || !user.id) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: 'User not authenticated',
        });
    }

    const userIdAsString = user.id;  // Keep userId as string (UUID)

    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Only allow deleting reviews by the user who created the review
        if (review.userId !== userIdAsString) {
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
