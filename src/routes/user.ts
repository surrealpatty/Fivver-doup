import express, { Router, Request, Response } from 'express'; // Removed unused NextFunction
import { registerUser, loginUser, updateUser, deleteUser } from '../controllers/userController'; // Import the functions
import authenticateToken from '../middlewares/authenticateToken'; // Use default import

const router: Router = express.Router();

// Route to register a new user
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    await registerUser(req, res); // Register the user
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Route to log in an existing user
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    await loginUser(req, res); // Log in the user
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Route to update user profile (requires authentication)
router.put('/update/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the authenticated user is trying to update their own profile
    if (req.user?.id !== req.params.id) {
      res.status(403).json({ message: 'You are not authorized to update this profile' });
      return; // Stop execution if not authorized
    }

    const updatedUser = await updateUser(req.params.id, req.body); // Ensure this returns a value
    res.status(200).json(updatedUser); // Response will be handled here
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Route to delete user (requires authentication)
router.delete('/delete/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the authenticated user is trying to delete their own account
    if (req.user?.id !== req.params.id) {
      res.status(403).json({ message: 'You are not authorized to delete this account' });
      return; // Stop execution if not authorized
    }

    await deleteUser(req, res); // Delete the user
    res.status(204).end(); // Send a successful deletion response
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
