// src/routes/profile.ts
import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types'; // Ensure correct import

const router = express.Router();

// GET /profile - Fetch profile information
router.get(
  '/profile',
  authenticateToken, // Middleware to authenticate user
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    try {
      // Access the user property with correct typing from CustomAuthRequest
      const user = req.user;

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
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;
