import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { ServiceController } from '../controllers/serviceController'; // Correct path

const router = Router();

// Example route with authentication middleware
router.get('/services', authenticateToken, ServiceController.getServices);

// Example route without authentication
router.get('/some-route', (req: Request, res: Response) => {
  res.status(200).send('Success');
});

// Export the router using default export so it can be imported correctly in src/index.ts
export default router;
