// src/routes/serviceRoute.ts

import express, { Request, Response } from 'express';
import Service from '../models/services'; // Import Service model
import User from '../models/user'; // Import User model (to check user existence)

const router = express.Router();

// CREATE: Add a new service
router.post('/services', async (req: Request, res: Response) => {
  const { userId, title, name, description, price } = req.body;

  try {
    // Validate that the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new service
    const service = await Service.create({
      userId,
      title,
      name,
      description,
      price,
    });

    // Return the newly created service
    return res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
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
          as: 'user', // Ensure this matches the alias in your Service model association
          attributes: ['id', 'username'],
        },
      ],
    });

    return res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
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
          as: 'user', // Ensure this matches the alias in your Service model association
          attributes: ['id', 'username'],
        },
      ],
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE: Update a service
router.put('/services/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number
  const { title, name, description, price } = req.body;

  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Update the service fields
    service.title = title || service.title;
    service.name = name || service.name;
    service.description = description || service.description;
    service.price = price || service.price;

    await service.save(); // Save the updated service
    return res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE: Delete a service
router.delete('/services/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number

  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.destroy(); // Delete the service
    return res.status(204).send(); // Return no content (204) status after deletion
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; // Export the router to use in the app
