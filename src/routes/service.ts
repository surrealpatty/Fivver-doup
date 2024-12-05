import express, { Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Import JWT authentication middleware
import { checkTier } from '../middlewares/tierMiddleware'; // Add checkTier middleware if needed
import { AuthRequest } from '../types/authMiddleware';  // Ensure this is imported correctly

const router = express.Router();

// Example route that uses AuthRequest and checks the tier
router.get('/', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const userTier = req.user.tier;  // Access tier from req.user

    // Your route logic, e.g., fetching services or performing actions based on the user's tier
    res.status(200).json({ message: 'Success', tier: userTier });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Example of a route using checkTier middleware
router.put('/:id', authenticateJWT, checkTier('paid'), async (req: AuthRequest, res: Response) => {
  // Your update logic
  res.status(200).json({ message: 'Service updated successfully' });
});

// Example of a POST route with user tier check
router.post('/', authenticateJWT, checkTier('paid'), async (req: AuthRequest, res: Response) => {
  // Your post logic
  res.status(201).json({ message: 'Service created successfully' });
});

// Example of a DELETE route
router.delete('/:id', authenticateJWT, async (req: AuthRequest, res: Response) => {
  // Your delete logic
  res.status(204).json({ message: 'Service deleted successfully' });
});

export default router;
