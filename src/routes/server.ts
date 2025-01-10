import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { ServiceController } from '../controllers/serviceController'; // Correct path

const router = Router();

// Example route with middleware applied
router.get('/services', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    await ServiceController.getServices(req, res); // Ensure that getServices returns void or Promise<void>
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
});

// Example route without authentication
router.get('/some-route', (req: Request, res: Response): void => {
  res.status(200).send('Success');
});

// Export the router
export default router;
