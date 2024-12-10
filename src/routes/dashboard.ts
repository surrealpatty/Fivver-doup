import { Router, Request, Response, NextFunction } from 'express'; // Importing necessary types
import { authenticateJWT } from '@middlewares/authenticateToken';  // Corrected import for authenticateJWT
import { getDashboardData } from '../controllers/dashboardController';  // Named import for controller
import { AuthRequest } from '@middlewares/authenticateToken';  // Import the correct AuthRequest type

const router = Router();

// GET /dashboard route to fetch user dashboard data
router.get('/dashboard', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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
