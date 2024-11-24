import { Router, Request, Response } from 'express';
import { Service, User, ServiceCreationAttributes } from '../models'; // Ensure this is correct
import { checkAuth } from '../middlewares/authMiddleware';

const router = Router();

router.post('/services', checkAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, title, description, price }: ServiceCreationAttributes = req.body;

    if (!userId || !title || !description || price === undefined) {
      res.status(400).json({
        message: 'Missing required fields: userId, title, description, and price are mandatory.',
        error: 'ValidationError',
      });
      return;
    }

    if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
      res.status(400).json({
        message: 'Invalid price: must be a positive number.',
        error: 'ValidationError',
      });
      return;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({
        message: `User with ID ${userId} not found.`,
        error: 'NotFoundError',
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
      message: 'Service created successfully.',
      serviceId: service.id,
      title: service.title,
    });
  } catch (error) {
    console.error('Error creating service:', error);

    res.status(500).json({
      message: 'Internal server error while creating the service.',
      error: error instanceof Error ? error.message : 'UnknownError',
    });
  }
});

export default router;
