import express, { Request, Response, NextFunction } from 'express';
import Service from '../models/services';
import { authenticateToken } from '../middlewares/authenticateToken';
import { AuthRequest } from '../types/authMiddleware';  // Correctly typed AuthRequest

const router = express.Router();

// Service route to get the user's services
router.get('/services', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user?.id;  // Get user ID from the authenticated token

  if (!userId) {
    res.status(400).json({ message: 'User ID not found in token' });
    return;
  }

  try {
    // Fetch the services for the authenticated user
    const services = await Service.findAll({ where: { userId } });

    res.status(200).json({
      message: 'User services retrieved successfully',
      services,  // Return the user's services
    });
  } catch (err) {
    console.error(err);
    next(err);  // Pass error to the next middleware (error handler)
  }
});

export default router;
