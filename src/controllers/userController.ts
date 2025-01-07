import { Request, Response } from 'express';
import { User, UserRole, UserTier } from '../models/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

// Controller for registering a new user
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password, tier = 'free', role = 'user' }: { email: string, username: string, password: string, tier: UserTier, role: UserRole } = req.body;

  // Validate input
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Email, username, and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      tier,
      role,
      isVerified: false,
    });

    const token = generateToken(newUser);

    // Exclude password from user data response
    const { password: _, ...userData } = newUser;

    return res.status(201).json({
      message: 'User registered successfully',
      user: userData,
      token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({
      message: 'Internal server error during registration.',
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

// Example function to get a user by ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Exclude sensitive data like password
    const { password: _, ...userData } = user;
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return res.status(500).json({
      message: 'Internal server error while fetching user.',
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};
