// src/routes/auth.ts
import { Router, Request, Response } from 'express';
import { User } from '@models/user';  // Correct import for User model

const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { email, username, password, role = 'free', tier = 'free' } = req.body; // Default role and tier

  try {
    // Hash password before saving user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      role,
      tier,
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

export default router;
