import { Router, Request, Response } from 'express';
import { Service, User } from '../models';  // Correct the import paths to your models
import { ServiceCreationAttributes } from '../models/services';  // Import the type for service creation
import { checkAuth } from '../middlewares/authMiddleware';  // Import the authentication middleware

const router = Router();  // Initialize the router

/**
 * POST /services
 * Route to create a new service
 */
router.post('/services', checkAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    // Destructure and type the incoming request body
    const { userId, title, description, price }: ServiceCreationAttributes = req.body;

    // Validate required fields
    if (!userId || !title || !description || price === undefined) {
      res.status(400).json({
        message: 'Missing required fields: userId, title, description, and price are mandatory.',
        error: 'ValidationError',
      });
      return; // Ensure we return early if validation fails
    }

    // Validate price
    if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
      res.status(400).json({
        message: 'Invalid price: must be a positive number.',
        error: 'ValidationError',
      });
      return; // Ensure we return early if validation fails
    }

    // Check if the user exists (We can get userId from req.user after checkAuth middleware)
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({
        message: `User with ID ${userId} not found.`,
        error: 'NotFoundError',
      });
      return; // Ensure we return early if the user does not exist
    }

    // Create the new service
    const service = await Service.create({
      userId,       // User ID associated with the service
      title,        // Service title
      description,  // Service description
      price,        // Service price
    });

    // Return only necessary information to the client
    res.status(201).json({
      message: 'Service created successfully.',
      serviceId: service.id,
      title: service.title,
    });
  } catch (error) {
    console.error('Error creating service:', error);

    res.status(500).json({
      message: 'Internal server error while creating the service.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
});

export default router;
