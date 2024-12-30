// src/routes/profile.ts
import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Ensure correct import
import { CustomAuthRequest } from '../types'; // Correct import for CustomAuthRequest

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
          tier: user.tier || 'Free', // Fallback to 'Free' if no tier provided
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

      // Validate if necessary user fields exist
      if (!id || !email || !username) {
        return res.status(400).json({ message: 'Invalid user data' });
      }

      const { newEmail, newUsername, newTier } = req.body;

      // Ensure that at least one field is provided for update
      if (!newEmail && !newUsername && !newTier) {
        return res.status(400).json({ message: 'No data provided for update' });
      }

      // Create the updated user object
      const updatedUser = {
        id,
        email: newEmail || email, // Fallback to current email if no new email provided
        username: newUsername || username, // Fallback to current username if no new username provided
        tier: newTier || tier, // Fallback to current tier if no new tier provided
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
