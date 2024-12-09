import { Router, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';  // JWT middleware
import { checkPaidTier } from '../middlewares/tierMiddleware';  // Tier middleware
import { updateService } from '../controllers/serviceController';  // Controller function

const router = Router();

// PUT route for updating an existing service
router.put('/services/:id', authenticateJWT, checkPaidTier, async (req, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Call the updateService controller function and wait for it to complete
    await updateService(req, res, next); // The controller function will handle the request and response
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

export default router;
