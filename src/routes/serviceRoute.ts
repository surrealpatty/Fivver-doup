// src/routes/serviceRoute.ts

import { Router, Request, Response } from 'express';
import { Service } from '../models/service'; // Adjust import path if necessary

const router = Router();

// Example of finding all services
router.get('/services', async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll(); // Sequelize method for finding all records
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: (error as Error).message });
  }
});

// Example of creating a service
router.post('/services', authMiddleware, async (req: Request, res: Response) => {
  try {
    const newService = await Service.create({ ...req.body, userId: req.user.id }); // Sequelize create method
    res.status(201).json({ message: 'Service created successfully', newService });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: (error as Error).message });
  }
});

// Example of finding a service by ID
router.get('/services/:id', async (req: Request, res: Response) => {
  try {
    const service = await Service.findByPk(req.params.id); // Sequelize method for finding by primary key
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: (error as Error).message });
  }
});

export default router;
