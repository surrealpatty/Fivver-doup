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
    const { email, password } = req.body; // Extract email and password from the body
    await loginUser(req, res, email, password); // loginUser should already handle the response internally
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

    const { id } = req.user; // Retrieve the user ID from the token or user object
    const { username, email, password } = req.body; // Get new data from request body

    await updateUser(req, res, { id, username, email, password }); // Pass the whole user data object to the controller
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

    const { id } = req.user; // Retrieve the user ID from the token or user object
    await deleteUser(req, res, id); // Pass just the id of the user to deleteUser controller
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
