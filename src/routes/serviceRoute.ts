import express, { Request, Response } from 'express';
import Service from '../models/services'; // Assuming the correct model file
import User from '../models/user'; // Assuming the correct model file

// Define types for request body for service creation
interface ServiceCreationBody {
  userId: number;
  title: string;
  description: string;
  price: number;
}

const router = express.Router();

/**
 * POST /services
 * Route to create a new service
 */
router.post('/services', async (req: Request<{}, {}, ServiceCreationBody>, res: Response) => {
  const { userId, title, description, price } = req.body;

  try {
    // Check for missing fields
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

    // Validate user existence
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: `User with ID ${userId} not found.`,
        error: 'NotFoundError',
      });
    }

    // Create a new service
    const service = await Service.create({
      userId: userId.toString(),     // User ID associated with the service
      title,        // Service title
      description,  // Service description
      price,        // Service price
    });

    return res.status(201).json({
      message: 'Service created successfully.',
      service,
    });
  } catch (error) {
    console.error('Error creating service:', error);

    // Return an appropriate error response
    return res.status(500).json({
      message: 'Internal server error while creating service.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
});

export default router;
