import { Router, Request, Response } from 'express';
import  { authenticateToken } from '../middlewares/authenticateToken'; // Correct import of authenticateToken middleware
import { ServiceController } from '../controllers/serviceController';  // Named import of ServiceController

const router = Router();

// Example route with middleware applied
router.get('/services', authenticateToken, ServiceController.getServices);  // Apply authenticateToken middleware

// Example route without authentication
router.get('/some-route', (req: Request, res: Response) => {
  res.status(200).send('Success');
});

// Export the router
export default router;
