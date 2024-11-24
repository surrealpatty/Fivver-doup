import express, { Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/userController';  // Import controller functions

const router = express.Router();  // Initialize router

// Register route
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await registerUser({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Login route
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Export the router as default
export default router;
