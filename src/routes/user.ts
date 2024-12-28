import express, { Request, Response } from 'express';
import { loginUser, updateUser, deleteUser, registerUser } from '../controllers/userController'; // Import the functions
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();

// Register route - public route for user registration
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    await registerUser(req, res); // registerUser only needs req and res
    return; // Explicitly return to ensure the function has no return value
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return; // Ensure to return here as well
  }
});

// Login route - public route for user login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    await loginUser(req, res); // Only pass req and res to the function (email and password are handled inside)
    return; // Explicitly return to ensure the function has no return value
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return; // Ensure to return here as well
  }
});

// Update user route - protected route (authentication required)
router.put('/update/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the authenticated user is trying to update their own profile
    if (req.user?.id !== req.params.id) {
      res.status(403).json({ message: 'You are not authorized to update this profile' });
      return; // Return after sending response
    }

    // Pass the whole user data object to the updateUser function
    await updateUser(req, res); // Only pass req and res to the function
    return; // Explicitly return to ensure the function has no return value
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return; // Ensure to return here as well
  }
});

// Delete user route - protected route (authentication required)
router.delete('/delete/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the authenticated user is trying to delete their own account
    if (req.user?.id !== req.params.id) {
      res.status(403).json({ message: 'You are not authorized to delete this account' });
      return; // Return after sending response
    }

    await deleteUser(req, res); // Only pass req and res to the function
    return; // Explicitly return to ensure the function has no return value
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return; // Ensure to return here as well
  }
});

export default router;
