import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';  // Correct import (no need for checkAuth)
import { ServiceCreationAttributes } from '@models/services';  // Import the model attributes type
import { User } from '@models/user';  // Correct alias for User model
import Service from '@models/services';  // Correct alias for Service model
import { AuthRequest } from '../types/authMiddleware';  // Import AuthRequest interface

const router = Router();

// POST route to create a service
router.post(
  '/services',  // Define the endpoint
  authenticateJWT,  // Apply the authentication middleware
  async (req: AuthRequest, res: Response): Promise<void> => {  // Updated to use AuthRequest
    try {
      // Destructure and type the request body using ServiceCreationAttributes
      const { userId, title, description, price }: ServiceCreationAttributes = req.body;

      // Validate required fields
      if (!userId || !title || !description || price === undefined) {
        res.status(400).json({
          message: 'Missing required fields: userId, title, description, and price are mandatory.',
          error: 'ValidationError',
        });
        return;
      }

      // Validate price
      if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
        res.status(400).json({
          message: 'Invalid price: must be a positive number.',
          error: 'ValidationError',
        });
        return;
      }

      // Check if the user exists (use the userId from the authenticated request)
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({
          message: `User with ID ${userId} not found.`,
          error: 'NotFoundError',
        });
        return;
      }

      // Create a new service for the user
      const service = await Service.create({
        userId,
        title,
        description,
        price,
      });

      // Send success response
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
  }
);

export default router;
