// src/routes/auth.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';  // Correct import for bcrypt
import { User } from '@models/user';  // Correct import for User model

const router = Router();

// Register route
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { email, username, password, role = 'free', tier = 'free' } = req.body; // Default role and tier

  try {
    // Hash password before saving user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure to include the 'isVerified' property if required by the model
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      role,
      tier,
      isVerified: false,  // Adding the 'isVerified' field as required by the User model
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

export default router;
