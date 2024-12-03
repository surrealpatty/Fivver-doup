import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware'; // JWT authentication middleware
import { checkTier } from '../middlewares/tierMiddleware'; // Tier-based access control middleware
import Service from '../models/service'; // Service model

const router = express.Router();

// Create a service (only for paid users)
router.post(
  '/post-service',
  authenticateToken, // Authenticate the user
  checkTier('paid'), // Restrict route access to users with 'paid' tier
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, description, price } = req.body;

      // Validate request body
      if (!title || !description || price === undefined) {
        res.status(400).json({ message: 'All fields are required.' });
        return;
      }

      // Retrieve the user ID from the authenticated token
      const userId = parseInt(req.user?.id || '', 10);
      if (isNaN(userId)) {
        res.status(400).json({ message: 'Invalid user ID.' });
        return;
      }

      // Create a new service entry
      const service = await Service.create({
        userId,
        title,
        description,
        price,
      });

      // Respond with the created service
      res.status(201).json({ message: 'Service created successfully.', service });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  }
);

export default router;
