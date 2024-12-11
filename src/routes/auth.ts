import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { AuthRequest } from '../types';  // Import the custom AuthRequest type

const router = Router();

// Profile Management Route: Update profile
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { email, username, password, newPassword } = req.body;

  try {
    // Ensure the user is authenticated and their ID is available
    const user = await User.findByPk(req.user?.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update email or username if provided
    if (email) user.email = email;
    if (username) user.username = username;

    // Handle password update if newPassword is provided
    if (newPassword) {
      // Compare the current password with the existing hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid current password.' });
      }

      // Hash and update the new password
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router to use in the main app
export default router;
