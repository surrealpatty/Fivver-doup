// src/routes/profile.ts
import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { AuthRequest } from '../types'; // Ensure 'AuthRequest' is imported
import { getProfile, updateProfile } from '../controllers/profileController';

const router = express.Router();

// Route to get profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Pass the entire req and res objects to getProfile
    return await getProfile(req, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update profile
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Pass the entire req and res objects to updateProfile
    return await updateProfile(req, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
