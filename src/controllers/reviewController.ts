import { Request, Response } from 'express';
import { Review, User, Service } from '../models'; // Check if these models are correctly exported

// 1. Create a Review
export const createReview = async (req: Request, res: Response): Promise<Response> => {
  const { serviceId, rating, comment } = req.body;
  const userIdAsNumber = parseInt(req.params.id, 10); // Convert userId from string to number

  // Input validation
  if (!serviceId || typeof rating !== 'number' || !comment) {
    return res.status(400).json({
      message: 'Service ID, rating, and comment are required.',
      error: 'InvalidInput',
    });
  }

  // Validate rating range
  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      message: 'Rating must be between 1 and 5.',
      error: 'InvalidRating',
    });
  }

  // Validate userId
  if (isNaN(userIdAsNumber)) {
    return res.status(400).json({
      message: 'Invalid userId. User ID must be a valid number.',
      error: 'InvalidInput',
    });
  }

  try {
    // Check if the service exists
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ 
        message: 'Service not found.', 
        error: 'NotFound' 
      });
    }

    // Create a new review
    const review = await Review.create({
      serviceId,
      userId: userIdAsNumber,
      rating,
      comment,
    });

    return res.status(201).json({
      message: 'Review created successfully.',
      review,
    });
  } catch (error) {
    console.error('Error creating review:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      error: (error as Error).message,
    });
  }
};

// 2. Get Reviews for a Service
export const getServiceReviews = async (req: Request, res: Response): Promise<Response> => {
  const { serviceId } = req.params;

  // Validate serviceId
  const parsedServiceId = parseInt(serviceId, 10);
  if (isNaN(parsedServiceId)) {
    return res.status(400).json({
      message: 'Invalid serviceId. It must be a valid number.',
      error: 'InvalidInput',
    });
  }

  try {
    const reviews = await Review.findAll({
      where: { serviceId: parsedServiceId },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'], // Include user details
        },
      ],
    });

    if (!reviews.length) {
      return res.status(404).json({
        message: 'No reviews found for this service.',
        error: 'NotFound',
      });
    }

    return res.status(200).json({
      message: 'Reviews fetched successfully.',
      reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      error: (error as Error).message,
    });
  }
};

// 3. Update a Review
export const updateReview = async (req: Request, res: Response): Promise<Response> => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  // Assuming user authentication middleware attaches the user to `req.user`
  const { id: userId } = req.user as { id: string }; 
  const userIdAsNumber = parseInt(userId, 10);

  // Validate userId
  if (isNaN(userIdAsNumber)) {
    return res.status(400).json({
      message: 'Invalid userId. User ID must be a valid number.',
      error: 'InvalidInput',
    });
  }

  // Ensure at least one of rating or comment is provided
  if (rating === undefined && !comment) {
    return res.status(400).json({
      message: 'At least one of rating or comment is required to update.',
      error: 'InvalidInput',
    });
  }

  // Validate rating if provided
  if (rating !== undefined && (typeof rating !== 'number' || rating < 1 || rating > 5)) {
    return res.status(400).json({
      message: 'Rating must be between 1 and 5.',
      error: 'InvalidRating',
    });
  }

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({
        message: 'Review not found.',
        error: 'NotFound',
      });
    }

    // Check if the user owns the review
    if (review.userId !== userIdAsNumber) {
      return res.status(403).json({
        message: 'You are not authorized to update this review.',
        error: 'Forbidden',
      });
    }

    // Update review fields
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save(); // Save the updated review

    return res.status(200).json({
      message: 'Review updated successfully.',
      review,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      error: (error as Error).message,
    });
  }
};
