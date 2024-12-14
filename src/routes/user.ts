// src/routes/user.ts
import { Router } from 'express';
import { User } from '../models/user'; // Import User model for handling user data
import { requestPasswordReset, resetPassword } from '../controllers/passwordResetController'; 

const router = Router();

// Define routes for users

// Example route: Get all users (can be customized as needed)
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll(); // Find all users
    res.json(users); // Return list of users
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Password reset route - Request password reset
router.post('/password-reset/request', requestPasswordReset); // Using controller for password reset request

// Password reset route - Reset password with token
router.post('/password-reset/reset', resetPassword); // Using controller for password reset

// Export the router with a name (userRoutes)
export const userRoutes = router;
