// src/routes/profile.ts

import express, { Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/authMiddleware'; // Import AuthRequest for typing

const router = express.Router();

// Route handler for getting user profile
router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Access the user from req.user with 'tier' correctly included
    const { id, email, username, tier } = req.user!; // req.user is now typed and should have the 'tier' property

    // Respond with the user data
    res.json({ id, email, username, tier });
  } catch (error) {
    next(error); // Forward the error to the error handler
  }
});

export default router;
