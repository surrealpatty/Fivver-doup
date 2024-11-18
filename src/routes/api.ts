import express, { Request, Response } from 'express';
import Service from 'src/models/services'; // Import the Service model
import User from 'src/models/user'; // Import the User model if needed for user-related routes

const router = express.Router();

// CREATE: Add a new service
router.post('/services', async (req: Request, res: Response) => {
  const { userId, title, description, price } = req.body;
  
  try {
    // Check if the user exists (this can also be a middleware for validation)
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
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name'], // Assuming 'name' is a field in the User model
      }],
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
  
  try {
    const service = await Service.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name'],
      }],
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
  const { title, description, price } = req.body;
  
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
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
  
  try {
    const service = await Service.findByPk(id);
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
