import { Router, Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types'; // Ensure this path is correct
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

// GET /profile - Fetch profile information
router.get(
  '/profile',
  authenticateToken, // Middleware to authenticate user
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const user = req.user; // Properly typed as UserPayload from CustomAuthRequest

      // If user is undefined, return 401 Unauthorized
      if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      return res.status(200).json({
        message: 'Profile fetched successfully',
        user: {
          id: user.id,
          email: user.email || 'No email provided',
          username: user.username || 'Anonymous',
          tier: user.tier || 'Free',
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
      const user = req.user; // Properly typed as UserPayload from CustomAuthRequest

      // If user is undefined, return 401 Unauthorized
      if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const { id, email, username, tier } = user;

      // Ensure that user data exists
      if (!id || !email || !username) {
        return res.status(400).json({ message: 'Invalid user data' });
      }

      const { newEmail, newUsername, newTier } = req.body;

      // Ensure at least one field is provided for update
      if (!newEmail && !newUsername && !newTier) {
        return res.status(400).json({ message: 'No data provided for update' });
      }

      // Create an updated user object
      const updatedUser = {
        id,
        email: newEmail || email,
        username: newUsername || username,
        tier: newTier || tier,
      };

      // Return the updated user object
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
