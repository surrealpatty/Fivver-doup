import express, { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Import authenticateJWT
import { checkTier } from '../middlewares/tierMiddleware'; // Ensure checkTier is correct
import Service from '../models/services'; // Correct import for Service model
import { AuthRequest } from '../types'; // Import AuthRequest

const router = express.Router();

// POST route to create a service
router.post(
  '/',
  authenticateJWT, // Protect this route with JWT authentication
  checkTier('paid'), // Ensure the user has the required tier (e.g., 'paid')
  async (req: AuthRequest, res: Response): Promise<void> => { // AuthRequest should extend Express.Request
    try {
      const { title, description, price } = req.body;

      // Input validation
      if (!title || !description || price === undefined) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Get the user ID from the JWT (from the `req.user` property)
      const userId = parseInt(req.user?.id || '', 10);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
      }

      // Create the service in the database
      const service = await Service.create({
        userId,
        title,
        description,
        price,
      });

      // Return success response with created service
      return res.status(201).json({ message: 'Service created successfully.', service });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.', error });
    }
  }
);

export default router;
