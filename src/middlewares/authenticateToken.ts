import { Request, Response } from 'express';
import { models } from '../models'; // Import models from the index.ts file

const { Review, User, Service } = models; // Destructure the models

// 1. Create a Review
export const createReview = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId, rating, comment } = req.body;
    const { userId } = req.user as { userId: string }; // Assuming userId is a string in the JWT payload

    const numericUserId = Number(userId); // Convert userId to a number

    // Validate input
    if (!serviceId || !rating || !comment) {
        return res.status(400).json({ message: 'Service ID, rating, and comment are required' });
    }

    try {
        // Check if the service exists
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Create a new review
        const review = await Review.create({
            serviceId,
            userId: numericUserId, // Use the numeric userId
            rating,
            comment
        });

        return res.status(201).json({ message: 'Review created successfully', review });
    } catch (error: unknown) {
        console.error('Error creating review:', error);
        return res.status(500).json({ message: 'Error creating review', error: (error as Error).message });
    }
};

// 2. Update a Review
export const updateReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params; // Get review ID from request params
    const { rating, comment } = req.body;
    const { userId } = req.user as { userId: string }; // Assuming userId is a string in the JWT payload

    const numericUserId = Number(userId); // Convert userId to a number

    // Validate input
    if (!rating && !comment) {
        return res.status(400).json({ message: 'Rating or comment is required to update' });
    }

    try {
        // Find the review by ID
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Ensure that the logged-in user is the one who wrote the review
        if (review.userId !== numericUserId) { // Compare numericUserId with review.userId
            return res.status(403).json({ message: 'You can only update your own reviews' });
        }

        // Update review details
        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await review.save(); // Save the updated review

        return res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error: unknown) {
        console.error('Error updating review:', error);
        return res.status(500).json({ message: 'Error updating review', error: (error as Error).message });
    }
};

// 3. Delete a Review
export const deleteReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params; // Get review ID from request params
    const { userId } = req.user as { userId: string }; // Assuming userId is a string in the JWT payload

    const numericUserId = Number(userId); // Convert userId to a number

    try {
        // Find the review by ID
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Ensure that the logged-in user is the one who wrote the review
        if (review.userId !== numericUserId) { // Compare numericUserId with review.userId
            return res.status(403).json({ message: 'You can only delete your own reviews' });
        }

        // Delete the review
        await review.destroy();

        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error: unknown) {
        console.error('Error deleting review:', error);
        return res.status(500).json({ message: 'Error deleting review', error: (error as Error).message });
    }
};
