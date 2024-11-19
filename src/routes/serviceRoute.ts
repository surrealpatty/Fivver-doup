import { Router, Request, Response } from 'express';
import { UserRequest } from './userRoutes';  // Import the UserRequest interface correctly
import Service from '../models/service';  // Ensure correct model import
import authMiddleware from '../middlewares/authMiddleware';  // Ensure correct import

const router = Router();

// Route for getting services (only authenticated users can view them)
router.get('/services', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Assuming Service is your model for services, and you want to get all services
    const services = await Service.findAll();

    return res.json(services); // Send services data as response
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// Route for creating a new service (only authenticated users can create them)
router.post('/services', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Assuming req.body contains the service data to be created
    const newService = await Service.create({ ...req.body, userId: req.user.id });

    return res.status(201).json(newService); // Send newly created service as response
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// Route for updating a service (only authenticated users can update their own services)
router.put('/services/:id', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the service by ID
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Ensure the service belongs to the authenticated user
    if (service.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own services' });
    }

    // Perform update logic here, e.g., updating the service fields
    const updatedService = await service.update(req.body);

    return res.json(updatedService); // Send updated service data as response
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// Route for deleting a service (only authenticated users can delete their own services)
router.delete('/services/:id', authMiddleware, async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the service by ID
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Ensure the service belongs to the authenticated user
    if (service.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own services' });
    }

    // Delete the service
    await service.destroy();

    return res.status(204).json({ message: 'Service deleted' }); // Return no content status
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

export default router;
