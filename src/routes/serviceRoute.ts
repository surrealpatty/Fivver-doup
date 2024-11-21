import express, { Request, Response } from 'express';
import Service from '../models/services'; // Import Service model
import User from '../models/user'; // Import User model (to check user existence)

// Define types for request body for service creation and update
interface ServiceCreationBody {
  userId: string;
  title: string;
  description: string;
  price: number;
}

const router = express.Router();

// CREATE: Add a new service
router.post('/services', async (req: Request<{}, {}, ServiceCreationBody>, res: Response) => {
  const { userId, title, description, price } = req.body;

  try {
    // Validate that the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }

    // Create a new service
    const service = await Service.create({
      userId,
      title,
      description,
      price,
    });

    // Return the newly created service
    return res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    return res.status(500).json({ message: 'Internal server error while creating service' });
  }
});

// READ: Get all services
router.get('/services', async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: User,
          as: 'user', // Ensure this matches the alias in your Service model association
          attributes: ['id', 'username'],
        },
      ],
    });

    return res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ message: 'Internal server error while fetching services' });
  }
});

// READ: Get a specific service by ID
router.get('/services/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number

  // Check if the serviceId is a valid number
  if (isNaN(serviceId)) {
    return res.status(400).json({ message: 'Invalid service ID format' });
  }

  try {
    const service = await Service.findOne({
      where: { id: serviceId },
      include: [
        {
          model: User,
          as: 'user', // Ensure this matches the alias in your Service model association
          attributes: ['id', 'username'],
        },
      ],
    });

    if (!service) {
      return res.status(404).json({ message: `Service with ID ${serviceId} not found` });
    }

    return res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return res.status(500).json({ message: 'Internal server error while fetching service' });
  }
});

// UPDATE: Update a service
router.put('/services/:id', async (req: Request<{ id: string }, {}, ServiceCreationBody>, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number
  const { title, description, price } = req.body;

  // Check if the serviceId is a valid number
  if (isNaN(serviceId)) {
    return res.status(400).json({ message: 'Invalid service ID format' });
  }

  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: `Service with ID ${serviceId} not found` });
    }

    // Update the service fields
    service.title = title || service.title;
    service.description = description || service.description;
    service.price = price || service.price;

    await service.save(); // Save the updated service
    return res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ message: 'Internal server error while updating service' });
  }
});

// DELETE: Delete a service
router.delete('/services/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number

  // Check if the serviceId is a valid number
  if (isNaN(serviceId)) {
    return res.status(400).json({ message: 'Invalid service ID format' });
  }

  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: `Service with ID ${serviceId} not found` });
    }

    await service.destroy(); // Delete the service
    return res.status(204).send(); // Return no content (204) status after deletion
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).json({ message: 'Internal server error while deleting service' });
  }
});

export default router; // Export the router to use in the app
