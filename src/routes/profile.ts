import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { AuthRequest } from '../types'; // Ensure 'AuthRequest' is imported
import { getProfile, updateProfile } from '../controllers/profileController';

const router = express.Router();

// Route to get profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  // Safely check if req.user is defined and has an id
  if (!req.user?.id) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Pass the user ID from req.user to getProfile function
    const userProfile = await getProfile(req.user.id, res); // Assuming getProfile takes user id and res
    return res.status(200).json(userProfile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update profile
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  // Safely check if req.user is defined and has an id
  if (!req.user?.id) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Pass the user ID and request body to updateProfile
    const updatedProfile = await updateProfile(req.user.id, req.body, res); // Assuming updateProfile takes user id, body, and res
    return res.status(200).json(updatedProfile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
