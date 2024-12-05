// src/routes/service.ts

import express, { Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/authMiddleware'; // Import AuthRequest for typing

const router = express.Router();

// GET route example
router.get('/', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    // Safely access user data, ensuring 'user' exists
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const { id, email, username, tier } = req.user; // Accessing user data with 'tier'
    res.json({ message: `User ${username} with tier ${tier}` });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services.' });
  }
});

// PUT route example
router.put('/:id', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    // Safely check if user is authenticated and their tier
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    if (req.user.tier !== 'paid') {
      return res.status(403).json({ message: 'Access denied. You need a paid tier to edit services.' });
    }

    // Proceed with service update logic (Add your specific logic here)
    res.json({ message: 'Service updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service.' });
  }
});

export default router;
