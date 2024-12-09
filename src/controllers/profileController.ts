// src/controllers/profileController.ts
import { Request, Response } from 'express';
import { User } from '@models/user';  // Ensure correct import for User model

// GET /profile - Get user profile
export const getProfile = async (req: Request, res: Response): Promise<void> => {
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
};

// PUT /profile - Update user profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;  // Extract user id from the token
  const { email, username } = req.body;

  try {
    // Find the user and update their details
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.email = email || user.email;  // If email is provided, update it, else keep current value
    user.username = username || user.username;  // Same for username
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
};
