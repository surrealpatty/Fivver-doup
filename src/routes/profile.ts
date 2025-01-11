import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types'; // Correct import for CustomAuthRequest

const router = express.Router();

// GET /profile - Fetch profile information
router.get(
  '/profile',
  authenticateToken, // Middleware to authenticate user
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user;

      // If user is not authenticated, respond with a 401 error
      if (!user) {
        res.status(401).json({ message: 'User not authenticated' });
        return; // Return early to ensure no further code executes
      }

      // Respond with profile details
      res.status(200).json({
        message: 'Profile fetched successfully',
        user: {
          id: user.id,
          email: user.email || 'No email provided',
          username: user.username || 'Anonymous',
          tier: user.tier, // Assume `tier` is always defined; no fallback needed
        },
      });
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  }
);

export default router;
