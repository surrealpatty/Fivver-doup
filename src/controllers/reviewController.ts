import { Request, Response } from 'express';
import { models } from '../models'; // Import models from the index.ts file

const { Review, User, Service } = models; // Destructure the models

// 1. Create a Review
export const createReview = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId, rating, comment } = req.body;
    const { userId } = req.user as { userId: string };  // assuming userId is a string

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
            // Assuming this is inside a function that handles a request
            import { Request, Response } from 'express';

            // Fix: Add type annotations for req and res
            export const someFunction = (req: Request, res: Response): void => {
                    // Ensure conversion to number
                    const userId: number = Number(req.user.userId); 
            
                    // Other code logic...
            
                    res.status(200).send({ userId }); // Example response
                    
                } catch (error: unknown) {
                    res.status(500).send('Error occurred');
                }
            }
            

            rating,  // This line should be inside an object or a function call
            comment
        });

        return res.status(201).json({ message: 'Review created successfully', review });
    } catch (error: unknown) {
        console.error('Error creating review:', error);
        return res.status(500).json({ message: 'Error creating review', error: (error as Error).message });
    }
};

// 2. Get Reviews for a Service
export const getServiceReviews = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId } = req.params; // Get service ID from request params

    try {
        // Fetch all reviews for the given service
        const reviews = await Review.findAll({
            where: { serviceId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email'], // Include relevant user details (exclude password)
                },
            ],
        });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this service' });
        }

        return res.status(200).json(reviews);
    } catch (error: unknown) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ message: 'Error fetching reviews', error: (error as Error).message });
    }
};

// 3. Update a Review
export const updateReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params; // Get review ID from request params
    const { rating, comment } = req.body;
    const { userId } = req.user as { userId: number }; // Assuming userId is stored as a number

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
        if (review.userId !== userId) { // Ensuring userId is a number
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

// 4. Delete a Review
export const deleteReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params; // Get review ID from request params
    const { userId } = req.user as { userId: number }; // Assuming userId is stored as a number
    if (req.user) {
        userId = Number(req.user.userId); // Ensure conversion to number
      }
      
    try {
        // Find the review by ID
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Ensure that the logged-in user is the one who wrote the review
        if (review.userId !== userId) {
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
