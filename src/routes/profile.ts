import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { User } from '../models/user'; // Correct

const router = express.Router();

// Route to fetch the user's profile data
router.get(
  '/',
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ message: 'User ID is missing or invalid' });
      return;
    }

    try {
      const userProfile = await User.findByPk(userId);

      if (!userProfile) {
        res.status(404).json({ message: 'User profile not found' });
        return;
      }

      res.status(200).json({
        message: 'Profile data fetched successfully',
        profile: {
          id: userProfile.id,
          username: userProfile.username,
          email: userProfile.email,
        },
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;
