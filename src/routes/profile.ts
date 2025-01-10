import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types'; // Ensure correct import

const router = express.Router();

// GET /profile - Fetch profile information
router.get(
  '/profile',
  authenticateToken, // Middleware to authenticate user
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<void> => { // Explicitly return Promise<void>
    try {
      const user = req.user;

      if (!user) {
        // Ensure we just send the response without returning it
        res.status(401).json({ message: 'User not authenticated' });
        return; // Return early to ensure no further code executes
      }

      // Send response without returning anything
      res.status(200).json({
        message: 'Profile fetched successfully',
        user: {
          id: user.id,
          email: user.email || 'No email provided',
          username: user.username || 'Anonymous',
          tier: user.tier || 'Free', // Fallback to 'Free' if no tier provided
        },
      });

      // No need to return anything from here, ensure code doesn't continue after sending response
    } catch (error) {
      // Pass error to the global error handler
      next(error);
    }
  }
);

export default router;
