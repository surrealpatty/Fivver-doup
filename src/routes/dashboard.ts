// src/routes/dashboard.ts

import { Router, Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authenticateToken';  // Ensure correct import of AuthRequest
import { getDashboardData } from '../controllers/dashboardController';

const router = Router();

// GET /dashboard route to fetch user dashboard data
router.get('/dashboard', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Call the controller function to fetch the dashboard data
    await getDashboardData(req, res);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
