// src/routes/dashboard.ts
import { Router, Request, Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authMiddleware';

const router = Router();

// GET route for the dashboard
router.get('/dashboard', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user) {
      // Logic to fetch dashboard data (e.g., user services, ratings, etc.)
      res.status(200).json({ message: 'Dashboard data fetched successfully.' });
    } else {
      res.status(400).json({ message: 'User not authenticated.' });
    }
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
});

export default router;
