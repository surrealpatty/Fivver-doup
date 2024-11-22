import { Request, Response } from 'express';
import Review from '../models/review';  // Use default import if exported as default
import { User, Service } from '../models'; // Import other models
import { checkAuth } from '../middlewares/authMiddleware'; 

// Middleware to ensure user is authenticated
export const ensureAuthenticated = checkAuth; 

// Create a Review
export const createReview = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId, rating, comment } = req.body;
    const userIdAsString = req.user?.id; 

    if (!serviceId || typeof rating !== 'number' || !comment) {
        return res.status(400).json({
            message: 'Service ID, rating, and comment are required',
            error: 'Invalid input',
        });
    }

    if (!userIdAsString) {
        return res.status(400).json({
            message: 'Invalid userId',
            error: 'User ID must be provided',
        });
    }

    try {
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const review = await Review.create({
            serviceId,
            userId: userIdAsString,
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
                    attributes: ['id', 'username', 'email'],
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

    const user = req.user; 
    if (!user || !user.id) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: 'User not authenticated',
        });
    }

    const userIdAsString = user.id; 

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

        if (review.userId !== userIdAsString) {
            return res.status(403).json({ message: 'You can only update your own review' });
        }

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

    const user = req.user;
    if (!user || !user.id) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: 'User not authenticated',
        });
    }

    const userIdAsString = user.id; 

    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

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
