import { Router, Request, Response } from 'express';
import { User } from '../models/user';  // Ensure you're importing the User model
import passwordResetRoutes from './passwordReset';  // Import the password reset routes
import profileRoutes from './profile';  // Import profile routes

const router = Router();

// Register route
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, username, tier } = req.body;

  // Check if the required fields are provided
  if (!email || !password || !username || !tier) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // You can add default values or pass additional values for 'role' and 'isVerified' if needed
    const newUser = await User.create({
      email,
      password,
      username,
      tier,
      role: 'user', // Default role, you can change as needed
      isVerified: false, // Default value for isVerified
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        email: newUser.email,
        username: newUser.username,
        tier: newUser.tier
      }
    });
  } catch (error: unknown) {
    // Fix the 'unknown' type error by typing it as 'Error'
    if (error instanceof Error) {
      console.error(error.message);  // Access the message property of Error
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
    // Handle unexpected error types
    return res.status(500).json({ message: 'Server error', error: 'Unknown error' });
  }
});

// Include other routes (e.g., password reset, profile)
router.use('/password-reset', passwordResetRoutes);  // Add password reset routes
router.use('/profile', profileRoutes);  // Add profile routes

// Export the router to be used in the main application
export default router;
