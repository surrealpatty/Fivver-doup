// src/routes/profile.ts

import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types';  // Ensure correct path to CustomAuthRequest type

const router = express.Router();

// Profile route - Update profile information
router.put('/profile', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  const customReq = req; // Type assertion to CustomAuthRequest

  // Ensure user data is present
  if (!customReq.user || !customReq.user.id || !customReq.user.username) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Extract user data from customReq.user
    const { id, email, username } = customReq.user;

    // Your logic for updating the profile (if any) here
    // Example response: You can replace it with actual logic to update profile in the database
    return res.status(200).json({ message: 'Profile updated successfully', user: { id, email, username } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
