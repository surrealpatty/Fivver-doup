import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';  // Correct import
import { AuthRequest } from '../types/authMiddleware';  // Correct path for AuthRequest

const router = Router();

// Example POST route for API (adjust according to actual logic)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
      // Your route logic here
      res.status(200).send('Success');
  } catch (error) {
      next(error); // Pass error to Express error handling middleware
  }
});

export default router;
