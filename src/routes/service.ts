// src/routes/service.ts
import express, { Response, NextFunction } from 'express';
import Service from '../models/services';
import { authenticateToken } from '../middleware/authMiddleware';
import { AuthRequest } from '../types';  // Ensure you're importing AuthRequest
import { Request } from 'express';

const router = express.Router();

router.get('/services', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'User not authenticated' });
    return; // Explicitly return after sending the response
  }

  const userId = req.user.id;  // Now it's safe to access `req.user.id`
  const userTier = req.user.tier;  // Now it's safe to access `req.user.tier`

  try {
    const services = await Service.findAll({ where: { userId } });

    res.status(200).json({
      message: 'User services retrieved successfully',
      services,
    });
  } catch (err) {
    console.error(err);
    next(err);  // Pass error to the next middleware (error handler)
  }
});

export default router;
