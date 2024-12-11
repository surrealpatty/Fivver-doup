// src/routes/service.ts
import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types';  // Correct import for AuthRequest
import Service from '../models/services';

const router = express.Router();

// GET route to fetch services for a user
router.get('/services', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  // Ensure that req.user is defined and contains necessary properties like 'id' and 'tier'
  if (!req.user || !req.user.id || !req.user.tier) {
    return res.status(401).json({ message: 'User not authenticated or missing tier information' });
  }

  const userId = req.user.id;  // Safely access the user ID
  const userTier = req.user.tier;  // Safely access the user tier

  try {
    // Fetch services associated with the user
    const services = await Service.findAll({ where: { userId } });

    // Return the services associated with the authenticated user
    return res.status(200).json({
      message: 'User services retrieved successfully',
      services,
    });
  } catch (err) {
    console.error(err);
    next(err);  // Pass the error to the error handler
  }
});

export default router;
