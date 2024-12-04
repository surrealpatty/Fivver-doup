import express, { Response } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Import authenticateJWT
import { checkTier } from '../middlewares/tierMiddleware'; // Ensure checkTier is correct
import Service from '../models/services'; // Correct import for Service model
import { AuthRequest } from 'types'; // or '../types' for relative path

const router = express.Router();

// POST route to create a service
router.post(
  '/',
  authenticateJWT, // Protect this route with JWT authentication
  checkTier('paid'), // Ensure the user has the required tier (e.g., 'paid')
  async (req: AuthRequest, res: Response): Promise<void> => { // Ensure the handler returns Promise<void>
    try {
      const { title, description, price } = req.body;

      // Input validation
      if (!title || !description || price === undefined) {
        res.status(400).json({ message: 'All fields are required.' });
        return; // Return after sending the response to prevent further execution
      }

      // Get the user ID from the JWT (from the `req.user` property)
      const userId = parseInt(req.user?.id || '', 10);
      if (isNaN(userId)) {
        res.status(400).json({ message: 'Invalid user ID.' });
        return; // Return after sending the response
      }

      // Create the service in the database
      const service = await Service.create({
        userId,
        title,
        description,
        price,
      });

      // Return success response with created service
      res.status(201).json({ message: 'Service created successfully.', service });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  }
);

export default router;
