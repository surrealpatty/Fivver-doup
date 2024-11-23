import { Router, Request, Response } from 'express';
import { Service } from '../models'; // Ensure this path is correct
import { checkAuth } from '../middlewares/authMiddleware'; // Correct import path for auth middleware

const router = Router();

// 1. Create a Service
router.post('/services', checkAuth, async (req: Request, res: Response): Promise<void> => {
  const { title, description, price } = req.body;
  const userId = req.user?.id; // Ensure `req.user` is populated by `checkAuth`

  if (!title || !description || !price) {
    res.status(400).json({
      message: 'Title, description, and price are required',
      error: 'Invalid input',
    });
    return;
  }

  try {
    if (!userId) {
      res.status(401).json({
        message: 'Authentication required',
      });
      return;
    }

    const service = await Service.create({
      userId,
      title,
      description,
      price,
    });

    res.status(201).json({
      message: 'Service created successfully',
      service,
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
});

// 2. Get all Services
router.get('/services', async (_req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.findAll();

    if (services.length === 0) {
      res.status(404).json({
        message: 'No services found',
      });
      return;
    }

    res.status(200).json({
      message: 'Services fetched successfully',
      services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
});

// 3. Get a single Service by ID
router.get('/services/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      res.status(404).json({
        message: 'Service not found',
      });
      return;
    }

    res.status(200).json({
      message: 'Service fetched successfully',
      service,
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
});

// 4. Update a Service by ID
router.put('/services/:id', checkAuth, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  const userId = req.user?.id;

  if (!title && !description && !price) {
    res.status(400).json({
      message: 'At least one field is required to update',
      error: 'Invalid input',
    });
    return;
  }

  try {
    if (!userId) {
      res.status(401).json({
        message: 'Authentication required',
      });
      return;
    }

    const service = await Service.findByPk(id);

    if (!service) {
      res.status(404).json({
        message: 'Service not found',
      });
      return;
    }

    if (service.userId !== userId) {
      res.status(403).json({
        message: 'Unauthorized to update this service',
      });
      return;
    }

    if (title) service.title = title;
    if (description) service.description = description;
    if (price) service.price = price;

    await service.save();

    res.status(200).json({
      message: 'Service updated successfully',
      service,
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
});

// 5. Delete a Service by ID
router.delete('/services/:id', checkAuth, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    if (!userId) {
      res.status(401).json({
        message: 'Authentication required',
      });
      return;
    }

    const service = await Service.findByPk(id);

    if (!service) {
      res.status(404).json({
        message: 'Service not found',
      });
      return;
    }

    if (service.userId !== userId) {
      res.status(403).json({
        message: 'Unauthorized to delete this service',
      });
      return;
    }

    await service.destroy();

    res.status(200).json({
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
});

export default router;
