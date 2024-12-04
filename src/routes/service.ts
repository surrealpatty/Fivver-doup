// src/routes/service.ts
import express, { Response, Request, NextFunction } from 'express';
import { AuthRequest } from '../types'; // Ensure correct import path
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkTier } from '../middlewares/tierMiddleware';
import Service from '../models/services'; // Correct import for Service model

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  checkTier('paid'), // Ensure checkTier is a valid middleware function
  async (req: AuthRequest, res: Response): Promise<void> => { // Return type should be void, not Response
    try {
      const { title, description, price } = req.body;

      if (!title || !description || price === undefined) {
        res.status(400).json({ message: 'All fields are required.' });
        return; // End the function early if there are validation errors
      }

      const userId = parseInt(req.user?.id || '', 10);
      if (isNaN(userId)) {
        res.status(400).json({ message: 'Invalid user ID.' });
        return; // End the function early if user ID is invalid
      }

      const service = await Service.create({
        userId,
        title,
        description,
        price,
      });

      res.status(201).json({ message: 'Service created successfully.', service });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  }
);

export default router;
