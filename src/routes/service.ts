import { Router, Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types'; // Ensure the import path is correct
import { authenticateJWT } from '../middlewares/authMiddleware';
import { updateService } from '../controllers/serviceController'; // Import the controller

const router = Router();

// PUT route for updating a service by ID
router.put('/services/:id', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Call the updateService controller function and wait for it to complete
    await updateService(req, res); // Assuming the updateService function handles the request logic
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

export default router;
