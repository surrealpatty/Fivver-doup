import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';  // Correct import

const router = Router();

// Example POST route for API (adjust according to actual logic)
router.post('/', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Your route logic here
    res.status(201).json({ message: 'Resource created successfully.' });
  } catch (error) {
    next(error);  // Pass errors to the error handler
  }
});

export default router;
