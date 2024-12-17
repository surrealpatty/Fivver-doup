// src/routes/service.ts
import express, { Request, Response } from 'express';
import  Service  from '../models/services'; // Assuming you have a Service model for DB interaction

const router = express.Router();

// Example route to get all services
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
});

// Example route to create a new service
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { title, description, price, userId } = req.body;
    const service = await Service.create({
      title,
      description,
      price,
      userId,
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error });
  }
});

export default router;
