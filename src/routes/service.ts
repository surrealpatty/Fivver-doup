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

    // Create a new service, associating it with the user
    const service = await Service.create({
      userId,
      title,
      description,
      price,
    });

    // Send back the created service
    return res.status(201).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
