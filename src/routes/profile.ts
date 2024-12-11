import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';  // Correct import
import { AuthRequest } from '../types';  // Correct import for AuthRequest

const router = Router();

// Route to get profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  // Safely check if req.user is defined and has an id
  if (!req.user?.id) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Logic to fetch user profile (example)
    const userProfile = { id: req.user.id, username: req.user.username }; // Example response
    return res.status(200).json(userProfile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update profile
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  if (!req.user?.id) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Logic to update user profile (example)
    const updatedProfile = { id: req.user.id, username: req.user.username }; // Example update
    return res.status(200).json(updatedProfile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
