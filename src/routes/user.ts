import express, { Request, Response } from 'express';
import { loginUser, updateUser, deleteUser, registerUser } from '../controllers/userController'; // Import the functions
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();

// Register route - public route for user registration
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    await registerUser(req, res); // registerUser only needs req and res
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Login route - public route for user login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    await loginUser(req, res); // Only pass req and res to the function (email and password are handled inside)
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Update user route - protected route (authentication required)
router.put('/update', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return; // Return early if user is not authenticated
    }

    // Pass the whole user data object to the updateUser function
    await updateUser(req, res); // Only pass req and res to the function
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Delete user route - protected route (authentication required)
router.delete('/delete', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return; // Return early if user is not authenticated
    }

    await deleteUser(req, res); // Only pass req and res to the function
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
