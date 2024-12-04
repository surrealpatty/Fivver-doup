import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';  
import { checkTier } from '../middlewares/tierMiddleware';
import Service from '../models/services'; 
import { AuthRequest } from '../types'; 

const router = express.Router();

// POST /services route to create a new service (only for paid users)
router.post(
  '/',
  authenticateToken, 
  checkTier('paid'), 
  async (req: AuthRequest, res: Response): Promise<Response> => {  // Ensure return type is Response
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

      return res.status(201).json({ message: 'Service created successfully.', service });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.', error });
    }
  }
);

export default router;
