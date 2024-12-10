import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';  // Correct import

const router = Router();

// Example POST route for API (adjust according to actual logic)
router.post('/', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
      // Your route logic here
      res.status(200).send('Success');
  } catch (error) {
      next(error);
  }
});