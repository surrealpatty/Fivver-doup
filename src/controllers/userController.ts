import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserRole, UserTier } from '../types'; // Corrected the import path for UserRole and UserTier

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, username, password, role, tier } = req.body;

    // Validate required fields
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Email, username, and password are required.' });
    }

    // Validate role and tier, default to enums if not provided
    const userRole = (role || UserRole.User) as UserRole; // Default to 'User' role
    const userTier = (tier || UserTier.Free) as UserTier; // Default to 'Free' tier

    // Create the user
    const user = await User.create({
      email,
      username,
      password,
      role: userRole,
      tier: userTier,
      isVerified: false, // Default to false
    });

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Failed to create user', error: error instanceof Error ? error.message : 'Unexpected error' });
  }
};
