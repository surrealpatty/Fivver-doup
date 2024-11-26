// src/routes/auth.ts

import { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/authController'; // Correctly import registerUser

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Server error during user registration.' });
  }
});

export default router;
