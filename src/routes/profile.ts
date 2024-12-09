// src/routes/profile.ts
import { Router, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';  // JWT middleware
import Service from '@models/services';  // Use alias correctly

const router = Router();

// GET route for retrieving user profile and associated services
router.get('/profile', authenticateJWT, async (req, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;  // req.user comes from the authenticateJWT middleware

    if (!user) {
      res.status(403).json({ message: 'User not authenticated' });
      return;
    }

    // Fetch services for the user
    const services = await Service.findAll({ where: { userId: user.id } });

    // Return the user data and associated services
    res.status(200).json({ user, services });
  } catch (error) {
    console.error('Error fetching profile:', error);
    next(error);  // Pass error to the next error handler
  }
});

export default router;
