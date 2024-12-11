// src/controllers/profileController.ts
import { Request, Response } from 'express';
import { User } from '../models/user';  // Ensure correct import for User model
import { UserPayload } from '../types';  // Import UserPayload interface to type req.user

// Extend Request to include user with proper typing
interface AuthRequest extends Request {
  user?: UserPayload;  // Adding user type to req object
}

// GET /profile - Get user profile
export const getProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  const userId = req.user?.id;  // Access user id from req.user
  if (!userId) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Find the user by their ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user profile details
    return res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      tier: user.tier,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /profile - Update user profile
export const updateProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  const userId = req.user?.id;  // Access user id from req.user
  if (!userId) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  const { email, username } = req.body;

  try {
    // Find the user and update their details
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user properties
    if (email) {
      user.email = email;
    }
    if (username) {
      user.username = username;
    }
    await user.save();

    // Return updated user profile
    return res.status(200).json({
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
    return res.status(500).json({ message: 'Internal server error' });
  }
};
