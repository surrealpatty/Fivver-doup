import express, { Request, Response } from 'express';
import Service from '../models/service'; // Import the updated Service model
import User from '../models/user'; // Import User model to associate with services

const router = express.Router();

// CREATE: Add a new service
router.post('/services', async (req: Request, res: Response) => {
  const { userId, title, description, price } = req.body;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new service
    const service = await Service.create({ userId, title, description, price });
    return res.status(201).json(service); // Return the newly created service
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// READ: Get all services
router.get('/services', async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: User,
          as: 'user', // Alias for the association
          attributes: ['id', 'username'], // Only select needed user attributes
        },
      ],
    });
    return res.status(200).json(services); // Return all services
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// READ: Get a specific service by ID
router.get('/services/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number

  try {
    const service = await Service.findOne({
      where: { id: serviceId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    return res.status(200).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE: Update a service
router.put('/services/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number
  const { title, description, price } = req.body;

  try {
    const service = await Service.findByPk(serviceId); // Find the service by primary key
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Update the service fields
    service.title = title || service.title;
    service.description = description || service.description;
    service.price = price || service.price;

    await service.save(); // Save the updated service
    return res.status(200).json(service); // Return the updated service
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE: Delete a service
router.delete('/services/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number

  try {
    const service = await Service.findByPk(serviceId); // Find the service by primary key
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.destroy(); // Delete the service
    return res.status(204).send(); // Return no content (204) status after deletion
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
