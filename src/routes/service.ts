import { Router, Request, Response } from 'express';
import { Service } from '../models'; // Import the Service model
import { checkAuth } from '../middleware/authMiddleware'; // Correct import for auth middleware

const router = Router();

// 1. Create a Service
router.post('/services', checkAuth, async (req: Request, res: Response): Promise<void> => {
  const { title, description, price } = req.body;
  const userId = req.user?.id; // Get user ID from the authenticated user

  // Validate input data
  if (!title || !description || !price) {
    res.status(400).json({
      message: 'Title, description, and price are required',
      error: 'Invalid input',
    });
    return; // Ensure no further processing
  }

  try {
    // Ensure userId is available before creating the service
    if (!userId) {
      res.status(400).json({
        message: 'User ID is missing or invalid',
        error: 'Authentication required',
      });
      return;
    }

    // Create a new service entry
    const service = await Service.create({
      userId, // The user creating the service
      title,
      description,
      price,
    });

    res.status(201).json({
      message: 'Service created successfully',
      service,
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
});

// 2. Get all Services
router.get('/services', async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all services
    const services = await Service.findAll();

    if (services.length === 0) {
      res.status(404).json({
        message: 'No services found',
      });
      return; // Ensure no further processing
    }

    res.status(200).json({
      message: 'Services fetched successfully',
      services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
});

// 3. Get a single Service by ID
router.get('/services/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    // Find a service by ID
    const service = await Service.findByPk(id);

    if (!service) {
      res.status(404).json({
        message: 'Service not found',
      });
      return; // Ensure no further processing
    }

    res.status(200).json({
      message: 'Service fetched successfully',
      service,
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
});

// 4. Update a Service by ID
router.put('/services/:id', checkAuth, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  const userId = req.user?.id; // Get user ID from the authenticated user

  // Validate input data
  if (!title && !description && !price) {
    res.status(400).json({
      message: 'At least one of title, description, or price is required to update',
      error: 'Invalid input',
    });
    return; // Ensure no further processing
  }

  try {
    // Ensure userId is available before attempting to update the service
    if (!userId) {
      res.status(400).json({
        message: 'User ID is missing or invalid',
        error: 'Authentication required',
      });
      return;
    }

    // Find the service by ID
    const service = await Service.findByPk(id);

    if (!service) {
      res.status(404).json({
        message: 'Service not found',
      });
      return; // Ensure no further processing
    }

    // Ensure the service belongs to the logged-in user (userId check)
    if (service.userId !== userId) {
      res.status(403).json({
        message: 'You can only update your own services',
      });
      return; // Ensure no further processing
    }

    // Update the service with the new values (only the provided fields)
    if (title) service.title = title;
    if (description) service.description = description;
    if (price) service.price = price;

    await service.save(); // Save updated service to the database

    res.status(200).json({
      message: 'Service updated successfully',
      service,
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
});

// 5. Delete a Service by ID
router.delete('/services/:id', checkAuth, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id; // Get user ID from the authenticated user

  try {
    // Ensure userId is available before attempting to delete the service
    if (!userId) {
      res.status(400).json({
        message: 'User ID is missing or invalid',
        error: 'Authentication required',
      });
      return;
    }

    // Find the service by ID
    const service = await Service.findByPk(id);

    if (!service) {
      res.status(404).json({
        message: 'Service not found',
      });
      return; // Ensure no further processing
    }

    // Ensure the service belongs to the logged-in user (userId check)
    if (service.userId !== userId) {
      res.status(403).json({
        message: 'You can only delete your own services',
      });
      return; // Ensure no further processing
    }

    // Delete the service
    await service.destroy();

    res.status(200).json({
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
});

export default router;
