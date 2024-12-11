// src/routes/profile.ts
import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { AuthRequest, UserPayload } from '../types'; // Ensure 'UserPayload' is imported
import { getProfile, updateProfile } from '../controllers/profileController';

const router = express.Router();

// Route to get profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  if (!req.user?.id) { // Use optional chaining here
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Call getProfile with both req and res (to match the function signature)
    await getProfile(req, res); // Ensure getProfile expects (req, res)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  // The response will be handled in getProfile
  return res; // Ensure you don't return here before the profile data is returned from getProfile
});

// Route to update profile
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  if (!req.user?.id) { // Use optional chaining here
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Call updateProfile with both req and res (to match the function signature)
    await updateProfile(req, res); // Ensure updateProfile expects (req, res)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  // The response will be handled in updateProfile
  return res; // Ensure you don't return here before the updated profile is returned from updateProfile
});

export default router;
