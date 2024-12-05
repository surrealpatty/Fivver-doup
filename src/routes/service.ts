import express, { Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/authMiddleware'; // Import AuthRequest for typing

const router = express.Router();

router.get('/', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { id, email, username, tier } = req.user!; // Accessing user data with 'tier'
    res.json({ message: `User ${username} with tier ${tier}` });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services.' });
  }
});

router.put('/:id', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    // Check if user is authorized based on tier
    if (req.user?.tier !== 'paid') {
      return res.status(403).json({ message: 'Access denied. You need a paid tier to edit services.' });
    }
    // Proceed with service update logic
    res.json({ message: 'Service updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service.' });
  }
});

export default router;
