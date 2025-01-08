// src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { generateToken } from '../utils/jwt'; // Import the token generation function
import { UserPayload } from '../types'; // Import UserPayload type for consistency
import { UserRole, UserTier } from '../types'; // Import UserRole and UserTier enums

// Authenticate User Function
export const authenticateUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password }: { email: string, password: string } = req.body;

  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create the user payload for the token (exclude password)
    const userPayload: UserPayload = {
      id: String(user.id), // Convert id to string
      email: user.email,
      username: user.username,
      tier: user.tier as UserTier, // Ensure tier is of type UserTier
      role: user.role as UserRole, // Ensure role is of type UserRole
    };

    // Generate the JWT token for the user
    const token = generateToken(userPayload);

    // Return the success message and the generated token with a 200 status code
    return res.status(200).json({
      message: 'Authentication successful',
      token, // Send back the generated token
    });
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
