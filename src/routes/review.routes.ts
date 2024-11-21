import { Router, Request, Response } from 'express';
import { Review, User, Service } from '../models'; // Correctly import models
import { checkAuth } from '../middleware/authMiddleware'; // Assuming you have an auth middleware

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
        return; // Ensure the function returns void after sending a response
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
    const { id: userId } = req.user as { id: string }; // Extract authenticated user ID
    const userIdAsNumber = parseInt(userId, 10);

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
