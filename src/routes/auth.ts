// src/routes/auth.ts

import { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/authController';

const router = Router();

// Define the route for user registration and ensure the handler is typed correctly
router.post('/register', async (req: Request, res: Response) => {
  try {
    await registerUser(req, res); // Await the promise returned by the handler
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ message: 'Server error during user registration.' });
  }
});

// Export the router
export default router;
