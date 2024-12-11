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
    // Pass the entire req and res to getProfile function
    const userProfile = await getProfile(req, res); // Now passing the entire req and res
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
    // Pass the entire req and res to updateProfile function
    const updatedProfile = await updateProfile(req, res); // Now passing the entire req and res
    return res.status(200).json(updatedProfile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
