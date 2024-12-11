// src/routes/service.ts

import express, { Response, NextFunction } from 'express';
import Service from '../models/services';
import { authenticateToken } from '../middlewares/authMiddleware';
import { AuthRequest, isUser } from '../types';  // Import isUser function and AuthRequest

const router = express.Router();

router.get('/services', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  // Use the type guard to ensure req.user is defined
  if (!isUser(req)) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  // Now `req.user` is properly typed and we can safely access its properties
  const userId = req.user.id;  // Access `id` safely
  const userTier = req.user.tier;  // Access `tier` safely

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
