import { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/authController';  // Import controller functions
import { UserPayload } from '@types';  // Ensure this resolves to 'src/types/index.ts'

const router = Router();

// Registration Route
router.post('/register', async (req: Request, res: Response) => {
  try {
    await registerUser(req, res);  // Call the registerUser function from the controller
  } catch (error) {
    console.error('Registration error:', error);  // Log error for debugging
    res.status(500).json({ message: 'Server error during user registration.' });
  }
});

// Login Route
router.post('/login', async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);  // Call the loginUser function from the controller
  } catch (error) {
    console.error('Login error:', error);  // Log error for debugging
    res.status(500).json({ message: 'Server error during login.' });
  }
});

export default router;
