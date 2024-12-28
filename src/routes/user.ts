import express, { Request, Response, NextFunction } from 'express';
import { loginUser, updateUser, deleteUser, registerUser } from '../controllers/userController'; // Import the functions
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();

// Register route - public route for user registration
router.post('/register', async (req: Request, res: Response): Promise<Response> => {
  try {
    return await registerUser(req, res); // Now registerUser directly returns a Response
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Login route - public route for user login
router.post('/login', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(req, res, email, password); // loginUser now directly returns a Response
    return res.status(200).json(user); // You no longer need to return res here, loginUser already handles it
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Update user route - protected route (authentication required)
router.put('/update', authenticateToken, async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id } = req.user; // Retrieve the user ID from the token or user object
    const { username, email, password } = req.body; // Get new data from request body

    return await updateUser(req, res, id, { username, email, password }); // Ensure updateUser returns a Response
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Delete user route - protected route (authentication required)
router.delete('/delete', authenticateToken, async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id } = req.user; // Retrieve the user ID from the token or user object

    return await deleteUser(req, res, id); // Ensure deleteUser returns a Response
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
