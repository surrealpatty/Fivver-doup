import express, { Request, Response } from 'express';
import Service from '@models/services';  // Ensure correct import for Service model
import { User }from '@models/user';  // Assuming there is a User model for user details
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct named import

const router = express.Router();

// Profile route to get the user's info and their services
router.get('/profile', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id; // Get user ID from the authenticated token

  if (!userId) {
    res.status(400).json({ message: 'User ID not found in token' });
    return;
  }

  try {
    // Fetch the user information and their services
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const services = await Service.findAll({ where: { userId } });

    res.status(200).json({
      message: 'User profile retrieved successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,  // Include relevant user details
      },
      services,  // Include user's services
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving user profile' });
  }
});

// Profile update route to allow users to update their profile information
router.put('/profile', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id; // Get user ID from the authenticated token

  if (!userId) {
    res.status(400).json({ message: 'User ID not found in token' });
    return;
  }

  const { username, email } = req.body;  // You can add other fields as needed

  try {
    // Find the user by ID and update their details
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update user details
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      message: 'User profile updated successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,  // Return updated user info
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

export default router;
