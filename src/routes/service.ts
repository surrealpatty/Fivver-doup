// src/routes/service.ts
import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';  // Adjust path as needed
import { checkTier } from '../middlewares/tierMiddleware'; // Tier-based access control middleware
import Service from '../models/services'; // Service model
import { AuthRequest } from '../types'; // Import the AuthRequest type

const router = express.Router();

// POST /services route to create a new service (only for paid users)
router.post(
  '/',
  authenticateToken, // Authenticate the user
  checkTier('paid'), // Restrict route access to users with 'paid' tier
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { title, description, price } = req.body;

      // Validate request body
      if (!title || !description || price === undefined) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Retrieve the user ID from the authenticated token
      const userId = parseInt(req.user?.id || '', 10); // req.user is now typed as UserPayload
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
      }

      // Create a new service entry
      const service = await Service.create({
        userId,
        title,
        description,
        price,
      });

      // Respond with the created service
      return res.status(201).json({ message: 'Service created successfully.', service });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.', error });
    }
  }
);

export default router;
