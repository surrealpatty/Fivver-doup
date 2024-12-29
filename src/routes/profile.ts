import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types'; 
import { UserPayload } from '../types'; 

const router = Router();

// Profile route - Get profile information
router.get('/profile', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Assert that req.user is available after authentication
    const user: UserPayload | undefined = req.user;

    // If `user` is not defined, return 401 Unauthorized
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    return res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.username,
      tier: user.tier,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Profile route - Update profile information
router.put('/profile', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Assert that req.user is available after authentication
    const user: UserPayload | undefined = req.user;

    // If `user` is not defined, return 401 Unauthorized
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id, email, username, tier } = user;

    // Ensure that required user data exists
    if (!id || !email || !username) {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    const { newEmail, newUsername, newTier } = req.body;

    // Ensure that at least one field is provided for update
    if (!newEmail && !newUsername && !newTier) {
      return res.status(400).json({ message: 'No data to update' });
    }

    const updatedUser = {
      id,
      email: newEmail || email,
      username: newUsername || username,
      tier: newTier || tier,
    };

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
