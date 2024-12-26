// src/routes/auth.ts

import { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/authController'; // Correctly import registerUser
import { UserCreationAttributes } from '../models'; // Import UserCreationAttributes

const router = Router();

// Interface to type the request body
interface RegisterRequest extends Request {
  body: UserCreationAttributes; // Extend Request with the UserCreationAttributes type
}

router.post('/register', async (req: RegisterRequest, res: Response) => {
  try {
    // Pass the request and response objects to the registerUser function
    await registerUser(req, res);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error during user registration.' });
  }
});

export default router;
