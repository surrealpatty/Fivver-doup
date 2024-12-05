import express, { Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/authMiddleware'; // Import AuthRequest for typing

const router = express.Router();

router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id, email, username, tier } = req.user!; // Now TypeScript recognizes user with 'tier'
    res.json({ id, email, username, tier });
  } catch (error) {
    next(error);
  }
});

export default router;
