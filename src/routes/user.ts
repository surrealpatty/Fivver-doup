import { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/authController'; // Import both registerUser and loginUser

const router = Router();

// Registration Route
router.post('/register', async (req: Request, res: Response) => {
  try {
    await registerUser(req, res); // Use the registerUser function from the controller
  } catch (error) {
    res.status(500).json({ message: 'Server error during user registration.' });
  }
});

// Login Route
router.post('/login', async (req: Request, res: Response) => {
  try {
    await loginUser(req, res); // Use the loginUser function from the controller
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.' });
  }
});

export default router;
