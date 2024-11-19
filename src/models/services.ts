import { Router, Request, Response } from 'express';
import Service from '../models/service';  // Correct import of Service model
import authMiddleware from '../middlewares/authMiddleware';  // Import authMiddleware

const router = Router();

// Example of finding all services
router.get('/services', async (req: Request, res: Response) => {
  try {
    // Correct usage of static method
    const services = await Service.findAll();
    res.json(services); // Return the list of services
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: (error as Error).message });
  }
});

// Example of creating a service
router.post('/services', authMiddleware, async (req: Request, res: Response) => {
  try {
    // Ensure req.body has the correct shape based on ServiceAttributes
    const { title, description, price, name } = req.body;
    
    const newService = await Service.create({ 
      title, 
      description, 
      price, 
      name, 
      userId: req.user.id  // Ensure userId is correctly attached from authMiddleware
    });

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
    res.json(service); // Return the found service
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: (error as Error).message });
  }
});

export default router;
