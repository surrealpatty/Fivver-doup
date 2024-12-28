import { Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register user
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user, including the isPaid property
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isPaid: false, // Add the missing 'isPaid' property
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Error registering user',
    });
  }
};
