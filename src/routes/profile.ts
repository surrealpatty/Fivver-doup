import express, { Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Import JWT authentication middleware
import { getUserProfile } from '../controllers/profileController'; // Assuming you have a profileController to fetch user profile
import { AuthRequest } from '../types/authMiddleware';  // Ensure this is imported correctly

const router = express.Router();

// Route to view the user's profile (GET /profile)
router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const profileData = await getUserProfile(req.user.id); // Ensure req.user is available and has 'id'
    res.status(200).json(profileData);
  } catch (error) {
    next(error);
  }
});

export default router;
