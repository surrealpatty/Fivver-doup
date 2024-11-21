// src/routes/serviceRoute.ts
import express, { Request, Response } from 'express';
import Service from '../models/services'; // Corrected import for clarity
import User from '../models/user'; // Corrected import for clarity

// Define types for request body for service creation
interface ServiceCreationBody {
  userId: number;
  title: string;
  description: string;
  price: number;
}

const router = express.Router();

// CREATE: Add a new service
router.post('/services', async (req: Request<{}, {}, ServiceCreationBody>, res: Response) => {
  const { userId, title, description, price } = req.body;

  try {
    // Check for missing fields
    if (!userId || !title || !description || !price) {
      return res.status(400).json({ message: 'Missing required fields in request body.' });
    }

    // Validate user existence
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }

    // Create a new service
    const service = await Service.create({ userId, title, description, price });

    return res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    console.error('Error creating service:', error);
    return res.status(500).json({ message: 'Internal server error while creating service.' });
  }
});

export default router;
