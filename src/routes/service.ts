import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { ServiceController } from '../controllers/serviceController'; // Correct path

const router = Router();

// Example route with authentication middleware
router.get('/services', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    // Call the controller method and pass the request and response objects
    await ServiceController.getServices(req, res);  // Ensure that this method does not return a Response object
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
});

// Example route without authentication
router.get('/some-route', (req: Request, res: Response): void => {
  res.status(200).send('Success');
});

// Export the router using default export so it can be imported correctly in src/index.ts
export default router;
