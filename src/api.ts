import { Router, Request, Response } from 'express'; // Import Router, Request, and Response from express
import { Service } from '../models/services'; // Correct the import
import { User } from '../models/user'; // Correct the import
import { ServiceCreationAttributes } from '../models/services'; // Import the type for Service creation

const router = Router(); // Initialize the router

/**
 * POST /services
 * Route to create a new service
 */
router.post('/services', async (req: Request, res: Response): Promise<Response> => {
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

    // Check if the user exists
    const user = await User.findByPk(userId);
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

    // Respond with the created service
    return res.status(201).json({
      message: 'Service created successfully.',
      service,
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

export default router; // Export the router for use in the application
