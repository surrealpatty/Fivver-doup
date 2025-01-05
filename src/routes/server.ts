import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { ServiceController } from '../controllers/serviceController'; 

const router = Router();

// Example route with middleware applied
router.get('/services', authenticateToken, ServiceController.getServices);  // Apply authenticateToken middleware

// Example route without authentication
router.get('/some-route', (req: Request, res: Response) => {
  res.status(200).send('Success');
});

// Export the router
export default router;
