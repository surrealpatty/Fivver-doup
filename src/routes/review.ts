import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types'; // Import the correct CustomAuthRequest

const router = express.Router();

// GET /review - Example route to fetch a review
router.get(
  '/review',
  authenticateToken, // Middleware to authenticate user
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user; // Get the user from the request

      // If user is not authenticated, respond with a 401 error
      if (!user) {
        res.status(401).json({ message: 'User not authenticated' });
        return; // Return early to ensure no further code executes
      }

      // Respond with sample review data (replace with actual logic as needed)
      res.status(200).json({
        message: 'Review fetched successfully',
        review: {
          userId: user.id,
          content: 'This is a sample review.',
        },
      });
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  }
);

export default router;
