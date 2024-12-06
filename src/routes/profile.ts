import { Router, Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types'; // Correct import path for AuthRequest
import { authenticateJWT } from '../middlewares/authMiddleware'; // Correct import for authenticateJWT
import Service from '@models/services'; // Ensure alias for services model is working correctly

const router = Router();

// GET route for retrieving user profile and associated services
router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;  // req.user comes from the authenticateJWT middleware

    // Check if the user exists
    if (!user) {
      res.status(403).json({ message: 'User not authenticated' });
      return;
    }

    // Fetch the services associated with the user from the database
    const services = await Service.findAll({ where: { userId: user.id } });

    // Respond with the user data and the user's services
    res.status(200).json({ user, services });
  } catch (error) {
    console.error('Error fetching profile:', error);
    next(error);  // Pass the error to the next error handler
  }
});

export default router;
