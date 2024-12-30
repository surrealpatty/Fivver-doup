import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types'; // Ensure correct import

const router = Router();

// GET /profile - Fetch profile information
router.get(
  '/profile',
  authenticateToken, // Middleware to authenticate user
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const user = req.user; // CustomAuthRequest will provide correct typing for req.user

      if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      return res.status(200).json({
        message: 'Profile fetched successfully',
        user: {
          id: user.id,
          email: user.email || 'No email provided',
          username: user.username || 'Anonymous',
          tier: user.tier || 'Free', // Make sure tier exists in the user object or fallback to 'Free'
        },
      });
    } catch (error) {
      next(error); // Pass error to global error handler
    }
  }
);

// PUT /profile - Update profile information
router.put(
  '/profile',
  authenticateToken, // Middleware to authenticate user
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const user = req.user; // CustomAuthRequest will provide correct typing for req.user

      if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const { id, email, username, tier } = user;

      if (!id || !email || !username) {
        return res.status(400).json({ message: 'Invalid user data' });
      }

      const { newEmail, newUsername, newTier } = req.body;

      if (!newEmail && !newUsername && !newTier) {
        return res.status(400).json({ message: 'No data provided for update' });
      }

      const updatedUser = {
        id,
        email: newEmail || email,
        username: newUsername || username,
        tier: newTier || tier,
      };

      return res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      next(error); // Pass error to global error handler
    }
  }
);

export default router;
