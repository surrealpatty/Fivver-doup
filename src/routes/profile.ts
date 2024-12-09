import { Router, Request, Response, NextFunction } from 'express';
import { User } from '@models/user';  // Ensure this import is correct
import authenticateToken from '@middlewares/authenticateToken';  // Use the authenticateToken middleware

const router = Router();

// Get user profile route
router.get('/profile', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user?.id;  // Extract user id from the token

  try {
    // Find the user by their ID
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      tier: user.tier,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile route
router.put('/profile', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user?.id;  // Extract user id from the token
  const { email, username } = req.body;

  try {
    // Find the user and update their details
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.email = email || user.email;
    user.username = username || user.username;
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        tier: user.tier,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
