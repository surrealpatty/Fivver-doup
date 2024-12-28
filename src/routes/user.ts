import express, { Router } from 'express';
import { registerUser, loginUser, updateUser, deleteUser } from '../controllers/userController'; // Import the functions
import { authenticateToken } from '../middlewares/authenticateToken';

const router: Router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    await registerUser(req, res); // Register the user
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Route to log in an existing user
router.post('/login', async (req, res) => {
  try {
    await loginUser(req, res); // Log in the user
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Route to update user profile (requires authentication)
router.put('/update/:id', authenticateToken, async (req, res) => {
  try {
    // Check if the authenticated user is trying to update their own profile
    if (req.user?.id !== req.params.id) {
      res.status(403).json({ message: 'You are not authorized to update this profile' });
      return; // Stop execution if not authorized
    }

    await updateUser(req, res); // Update the user
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Route to delete user (requires authentication)
router.delete('/delete/:id', authenticateToken, async (req, res) => {
  try {
    // Check if the authenticated user is trying to delete their own account
    if (req.user?.id !== req.params.id) {
      res.status(403).json({ message: 'You are not authorized to delete this account' });
      return; // Stop execution if not authorized
    }

    await deleteUser(req, res); // Delete the user
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
