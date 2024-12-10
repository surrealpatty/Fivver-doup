import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '@middlewares/authenticateToken';  // Named import for middleware
import { getDashboardData } from '../controllers/dashboardController';  // Named import for controller

const router = Router();

// GET /dashboard route to fetch user dashboard data
router.get('/dashboard', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Call the controller function to fetch the dashboard data
    await getDashboardData(req, res);
  } catch (err) {
    console.error(err);
    // Pass the error to the next middleware or handler
    next(err);
  }
});

export default router;
