// src/routes/dashboard.ts
import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct named import
import { getDashboardData } from '../controllers/dashboardController';  // Named import

const router = Router();

// GET /dashboard route to fetch user dashboard data
router.get('/dashboard', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call the controller function to fetch the dashboard data
    await getDashboardData(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

export default router;
