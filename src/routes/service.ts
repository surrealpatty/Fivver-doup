import { Router, Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types'; // Correct import path for AuthRequest
import { authenticateJWT } from '../middlewares/authMiddleware'; // Correct import for authenticateJWT
import { updateService } from '../controllers/serviceController'; // Import the controller function

const router = Router();

// PUT route for updating a service by ID
router.put('/services/:id', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Call the updateService controller function and wait for it to complete
    await updateService(req, res); // The controller function will handle the request and response
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

export default router;
