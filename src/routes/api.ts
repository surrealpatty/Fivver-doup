import { Router, Request, Response } from 'express';
import { Service, User } from '../models';  // Correct the import paths to your models
import { ServiceCreationAttributes } from '../models/services';  // Import the type for service creation
import { checkAuth } from '../middlewares/authMiddleware';  // Import the authentication middleware

const router = Router();  // Initialize the router

/**
 * POST /services
 * Route to create a new service
 */
router.post('/services', checkAuth, async (req: Request, res: Response): Promise<Response> => {  // Ensure checkAuth middleware is used
  try {
    // Destructure and type the incoming request body
    const { userId, title, description, price }: ServiceCreationAttributes = req.body;

    // Validate required fields
    if (!userId || !title || !description || price === undefined) {
      return res.status(400).json({
        message: 'Missing required fields: userId, title, description, and price are mandatory.',
        error: 'ValidationError',
      });
    }

    // Validate price
    if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
      return res.status(400).json({
        message: 'Invalid price: must be a positive number.',
        error: 'ValidationError',
      });
    }

    // Check if the user exists (We can get userId from req.user after checkAuth middleware)
    const user = await User.findByPk(userId); // Corrected the import of User model
    if (!user) {
      return res.status(404).json({
        message: `User with ID ${userId} not found.`,
        error: 'NotFoundError',
      });
    }

    // Create the new service
    const service = await Service.create({
      userId,       // User ID associated with the service
      title,        // Service title
      description,  // Service description
      price,        // Service price
    });

    // Return only necessary information to the client, omitting sensitive data
    return res.status(201).json({
      message: 'Service created successfully.',
      serviceId: service.id,  // Return just the service ID
      title: service.title,   // Optionally, return some basic info
    });
  } catch (error) {
    console.error('Error creating service:', error);

    // Return an appropriate error response
    return res.status(500).json({
      message: 'Internal server error while creating the service.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
});

export default router;  // Export the router for use in the application
