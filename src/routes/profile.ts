import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';  // Correct import
import { User } from '../models/user';  // Ensure the User model is imported
import { AuthRequest } from '../types';  // Import AuthRequest for properly typing req

const router = Router();

// Route to get profile (requires authentication)
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  // Safely check if req.user is defined and has an id
  if (!req.user?.id) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Fetch user profile from the database using the ID from the token
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user profile
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
});

// Route to update profile (requires authentication)
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  if (!req.user?.id) {
    return res.status(400).json({ message: 'User not authenticated or invalid user data' });
  }

  try {
    // Logic to update user profile
    const { username } = req.body;  // Assuming only username is being updated for this example

    const updatedUser = await User.update({ username }, { where: { id: req.user.id } });

    if (!updatedUser[0]) {  // [0] represents the number of updated rows
      return res.status(404).json({ message: 'User not found or nothing to update' });
    }

    // Return updated profile
    return res.status(200).json({ message: 'Profile updated successfully', username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
});

export default router;
