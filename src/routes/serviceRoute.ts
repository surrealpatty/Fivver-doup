// src/routes/serviceRoute.ts
import { Router, Request, Response } from 'express';
import { UserRequest } from '../middlewares/authMiddleware'; // Correct the import path for UserRequest
import Service from '../models/service'; // Ensure correct model import
import authMiddleware from '../middlewares/authMiddleware'; // Ensure correct import

const router = Router();

// Route for getting services (only authenticated users can view them)
router.get('/services', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    // Ensure user exists
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get all services from the database
    const services = await Service.findAll();

    // Respond with the list of services
    return res.json(services);
  } catch (error) {
    // Handle server errors
    console.error('Error fetching services:', error);
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// Route for creating a new service (only authenticated users can create them)
router.post('/services', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    // Ensure user exists
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Validate request body (you could add further validation here)
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
      return res.status(400).json({ message: 'Missing required fields: title, description, and price' });
    }

    // Create the new service and attach the user ID
    const newService = await Service.create({ ...req.body, userId: req.user.id });

    // Respond with the created service
    return res.status(201).json(newService);
  } catch (error) {
    // Handle server errors
    console.error('Error creating service:', error);
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// Route for updating a service (only authenticated users can update their own services)
router.put('/services/:id', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    // Ensure user exists
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the service by ID
    const service = await Service.findByPk(req.params.id);

    // Handle case where service is not found
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Ensure the service belongs to the authenticated user
    if (service.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own services' });
    }

    // Update the service
    const updatedService = await service.update(req.body);

    // Respond with the updated service data
    return res.json(updatedService);
  } catch (error) {
    // Handle server errors
    console.error('Error updating service:', error);
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// Route for deleting a service (only authenticated users can delete their own services)
router.delete('/services/:id', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    // Ensure user exists
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the service by ID
    const service = await Service.findByPk(req.params.id);

    // Handle case where service is not found
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Ensure the service belongs to the authenticated user
    if (service.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own services' });
    }

    // Delete the service
    await service.destroy();

    // Respond with a no content status
    return res.status(204).json({ message: 'Service deleted' });
  } catch (error) {
    // Handle server errors
    console.error('Error deleting service:', error);
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

export default router;
