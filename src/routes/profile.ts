import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware'; // Ensure authenticateToken is imported
import { User } from '../models'; // Import the User model to fetch user data

const router = express.Router();

// Route to fetch the user's profile data
router.get('/', authenticateToken, async (req: Request, res: Response): Promise<Response> => {
  // Ensure the user is correctly assigned from the token middleware
  const userId = req.user?.id; // Use userId from the token

  // Check if user ID is valid
  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing or invalid' });
  }

  try {
    // Fetch user profile from the database
    const userProfile = await User.findByPk(userId);

    // If the user is not found, return a 404 response
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Return the user profile (excluding sensitive data like password)
    return res.status(200).json({
      message: 'Profile data fetched successfully',
      profile: {
        id: userProfile.id,
        username: userProfile.username,
        email: userProfile.email,
        // Add other relevant user fields here as needed
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
