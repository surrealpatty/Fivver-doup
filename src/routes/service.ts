import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkTier } from '../middlewares/tierMiddleware';
import Service from '../models/services';
import { AuthRequest } from '../types'; // Ensure correct import path

const router = express.Router();

// POST /services route to create a new service (only for paid users)
router.post(
  '/',
  authenticateToken, 
  checkTier('paid'),
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {  // Use void as the return type
    try {
      const { title, description, price } = req.body;

      if (!title || !description || price === undefined) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      const userId = parseInt(req.user?.id || '', 10);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
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
      next(error); // Pass errors to the global error handler
    }
  }
);

export default router;
