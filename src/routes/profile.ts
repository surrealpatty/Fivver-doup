import { Router, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // JWT authentication middleware
import Service from '@models/services'; // Correct usage of alias for Service model

const router = Router();

// GET route to retrieve user profile and associated services
router.get('/profile', authenticateJWT, async (req, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;  // req.user comes from authenticateJWT middleware

    if (!user) {
      res.status(403).json({ message: 'User not authenticated' });
      return;  // Make sure to return early to stop further execution
    }

    // Fetch services associated with the user from the services table
    const services = await Service.findAll({ where: { userId: user.id } });

    // Return user profile and their associated services
    res.status(200).json({ user, services });
  } catch (error) {
    console.error('Error fetching profile:', error);
    next(error);  // Pass error to the global error handler
  }
});

export default router;
