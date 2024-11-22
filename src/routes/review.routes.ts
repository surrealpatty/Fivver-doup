import { Router, Request, Response } from 'express';
import { Review, User, Service } from '../models'; // Correctly import models
import { checkAuth } from '../middlewares/authMiddleware'; // Import the checkAuth middleware

const router = Router();

// 1. Create a Review
router.post('/reviews/:id', checkAuth, async (req: Request, res: Response): Promise<void> => {
    const { serviceId, rating, comment } = req.body;
    const userIdAsNumber = parseInt(req.params.id, 10); // Convert userId from string to number

    // Input validation
    if (!serviceId || typeof rating !== 'number' || !comment) {
        res.status(400).json({
            message: 'Service ID, rating, and comment are required',
            error: 'Invalid input'
        });
        return;
    }

    // Check if userId is a valid number
    if (isNaN(userIdAsNumber)) {
        res.status(400).json({
            message: 'Invalid userId',
            error: 'User ID must be a valid number'
        });
        return;
    }

    try {
        const service = await Service.findByPk(serviceId); // Check if the service exists
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }

        const review = await Review.create({
            serviceId,
            userId: userIdAsNumber,
            rating,
            comment,
        });

        res.status(201).json({
            message: 'Review created successfully',
            review
        });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
});

// 2. Get Reviews for a Service
router.get('/reviews/:serviceId', async (req: Request, res: Response): Promise<void> => {
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
            res.status(404).json({ message: 'No reviews found for this service' });
            return;
        }

        res.status(200).json({
            message: 'Reviews fetched successfully',
            reviews
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
});

// 3. Update a Review
router.put('/reviews/:reviewId', checkAuth, async (req: Request, res: Response): Promise<void> => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Ensure the user is authenticated
    const user = req.user as { id: string }; // Extract authenticated user
    if (!user || !user.id) {
        res.status(401).json({
            message: 'Unauthorized',
            error: 'User not authenticated',
        });
        return;
    }

    const userIdAsNumber = parseInt(user.id, 10);

    if (!rating && !comment) {
        res.status(400).json({
            message: 'At least one of rating or comment is required to update'
        });
        return;
    }

    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }

        // Only allow updating reviews by the user who created the review
        if (review.userId !== userIdAsNumber) {
            res.status(403).json({ message: 'You can only update your own review' });
            return;
        }

        // Update the review
        review.rating = rating ?? review.rating; // Update rating if provided, else keep existing
        review.comment = comment ?? review.comment; // Update comment if provided, else keep existing
        await review.save();

        res.status(200).json({
            message: 'Review updated successfully',
            review
        });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
});

// 4. Delete a Review
router.delete('/reviews/:reviewId', checkAuth, async (req: Request, res: Response): Promise<void> => {
    const { reviewId } = req.params;

    // Ensure the user is authenticated
    const user = req.user as { id: string }; // Extract authenticated user
    if (!user || !user.id) {
        res.status(401).json({
            message: 'Unauthorized',
            error: 'User not authenticated',
        });
        return;
    }

    const userIdAsNumber = parseInt(user.id, 10);

    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }

        // Only allow deleting reviews by the user who created the review
        if (review.userId !== userIdAsNumber) {
            res.status(403).json({ message: 'You can only delete your own review' });
            return;
        }

        await review.destroy();

        res.status(200).json({
            message: 'Review deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
});

export default router;
