// src/routes/auth.ts
import { Request, Response } from 'express';
import { User } from '@models/user';  // Import User model

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password, role, tier } = req.body;

  try {
    // Hash password before saving user
    const hashedPassword = await User.hashPassword(password);

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
};
