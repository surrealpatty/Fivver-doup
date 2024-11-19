import { Request, Response } from 'express';
import { models } from '../models'; // Import models from the index.ts file

const { Review, User, Service } = models; // Destructure the models

// 1. Create a Review
export const createReview = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId, rating, comment } = req.body;
    const { userId } = req.user; // Assuming userId is stored in the JWT payload

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
            interface RequestBody {
                userId: string | number;
              }
              
              const userId = Number((req.body as RequestBody).userId);
              
            rating,
            comment,
        });

        return res.status(201).json({ message: 'Review created successfully', review });
    } catch (error: unknown) {
        console.error('Error creating review:', error);
        const errMessage = (error as Error).message; // Cast error to Error type
        return res.status(500).json({ message: 'Error creating review', error: errMessage });
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
        const errMessage = (error as Error).message;
        return res.status(500).json({ message: 'Error fetching reviews', error: errMessage });
    }
};

// 3. Update a Review
export const updateReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params; // Get review ID from request params
    const { rating, comment } = req.body;
    const { userId } = req.user; // Assuming userId is stored in the JWT payload

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
        if (Number(review.userId) !== Number(userId)) {
            // Your logic here
          }
          
            return res.status(403).json({ message: 'You can only update your own reviews' });
        }

        // try {
  if (rating) review.rating = rating;
} catch (error) {
  // Handle the error
}


        // Save the updated review
        try {
            // your code here
          } catch (error: unknown) {
            // handle the error
          };


        return res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error: unknown) {
        console.error('Error updating review:', error);
        const errMessage = (error as Error).message;
        return res.status(500).json({ message: 'Error updating review', error: errMessage });
    }
};

// 4. Delete a Review
export const deleteReview = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId } = req.params; // Get review ID from request params
    const { userId } = req.user; // Assuming userId is stored in the JWT payload

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
        const errMessage = (error as Error).message;
        return res.status(500).json({ message: 'Error deleting review', error: errMessage });
    }
};
