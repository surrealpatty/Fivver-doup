import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest
import { updateProfile } from '../controllers/profileController';

const router = express.Router();

// Profile route - Update profile information
router.put('/profile', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  const customReq = req;

  // Ensure user data is present
  if (!customReq.user || !customReq.user.id || !customReq.user.username) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Call the updateProfile controller function
    await updateProfile(customReq, res);

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
