import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { updateService } from '../controllers/serviceController'; // Import the controller

const router = Router();

// Add a PUT route for updating services
router.put('/services/:id', authenticateJWT, async (req, res, next) => {
  try {
    await updateService(req, res); // Wait for the async function to complete
  } catch (error) {
    next(error); // Pass any errors to Express's error handling middleware
  }
});

export default router;
