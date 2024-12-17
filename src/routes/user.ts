import { Router } from 'express';
import { User } from '../models/user'; // Import User model for handling user data
import { registerUser } from '../controllers/userController'; // User registration controller
import { validateRegistration } from '../middlewares/validateRegistration'; 
import { requestPasswordReset, resetPassword } from '../controllers/passwordResetController'; // Password reset controllers

const router = Router();

// Route for user registration
router.post('/register', validateRegistration, registerUser); 
// validateRegistration ensures data integrity (e.g., required fields)

// Route to request a password reset
router.post('/password-reset/request', requestPasswordReset);

// Route to reset the password with a token
router.post('/password-reset/reset', resetPassword);

// Example route: Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll(); // Retrieve all users from the database
    res.json(users); // Respond with the list of users
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
