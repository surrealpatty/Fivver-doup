import { Request, Response } from 'express';
import { Review, User, Service } from '../models'; // Correctly import models

// 1. Create a Review
export const createReview = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId, rating, comment } = req.body;
    const userIdAsNumber = parseInt(req.params.id, 10); // Convert userId from string to number

    // Input validation
    if (!serviceId || typeof rating !== 'number' || !comment) {
        return res.status(400).json({ 
            message: 'Service ID, rating, and comment are required', 
            error: 'Invalid input' 
        });
    }

    // Check if userId is a valid number
    if (isNaN(userIdAsNumber)) {
        return res.status(400).json({ 
            message: 'Invalid userId', 
            error: 'User ID must be a valid number' 
        });
    }

    try {
        const service = await Service.findByPk(serviceId); // Check if the service exists
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const review = await Review.create({
            serviceId,
            userId: userIdAsNumber,
            rating,
            comment,
        });

        return res.status(201).json({ 
            message: 'Review created successfully', 
            review 
        });
    } catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: (error as Error).message 
        });
    }
};

// 2. Get Reviews for a Service
export const getServiceReviews = async (req: Request, res: Response): Promise<Response> => {
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

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this service' });
        }

        return res.status(200).json({ 
            message: 'Reviews fetched successfully', 
            reviews 
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: (error as Error).message 
        });
    }
};

// 3. Update a Review
export const updateReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const { id: userId } = req.user as { id: string }; // Extract authenticated user ID
    const userIdAsNumber = parseInt(userId, 10);

    if (!rating && !comment) {
        return res.status(400).json({ 
            message: 'At least one of rating or comment is required to update' 
        });
    }

    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the user is the one who posted the review
        if (review.userId !== userIdAsNumber) {
            return res.status(403).json({ message: 'You can only update your own reviews' });
        }

        // Update the review with new values
        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await review.save(); // Save the updated review

        return res.status(200).json({
            message: 'Review updated successfully',
            review,
        });
    } catch (error) {
        console.error('Error updating review:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: (error as Error).message,
        });
    }
};
