import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import Service from '../models/service'; // Assuming you have a Service model

const router = Router();

// Get all services
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
});

// Get services by user (if applicable)
router.get('/user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const services = await Service.findAll({ where: { userId } });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user services', error });
  }
});

// Update service route
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const service = await Service.findByPk(id);

    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Ensure that only the owner can update their service
    if (service.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this service' });
    }

    service.title = title || service.title;
    service.description = description || service.description;
    service.price = price || service.price;

    await service.save();

    res.json({ message: 'Service updated', service });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
});

// Delete service route
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Ensure that only the owner can delete their service
    if (service.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this service' });
    }

    await service.destroy();
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
});

export default router;
