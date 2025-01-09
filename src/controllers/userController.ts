// Import necessary modules and types
import { Request, Response } from 'express';
import User from '../models/user'; // Assuming User is a Sequelize model
import { UserRole, UserTier } from '../types'; // Import consolidated types

// Controller for registering a new user
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, username, role, tier }: { 
      email: string; 
      password: string; 
      username: string; 
      role?: UserRole; 
      tier?: UserTier; 
    } = req.body;

    // Validate required fields
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Email, password, and username are required.' });
    }

    // Default values for role and tier if not provided
    const userRole: UserRole = role || 'user'; // Default to 'user' role
    const userTier: UserTier = tier || 'Free'; // Default to 'Free' tier

    // Set the default value for isVerified
    const isVerified = false; // Assuming new users are not verified

    // Create new user in the database
    const user = await User.create({ 
      email, 
      password, 
      username, 
      role: userRole, 
      tier: userTier,
      isVerified,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'User registration failed', error });
  }
};

// Controller for fetching user details by ID
export const getUserDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password: _, ...userData } = user.toJSON();
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({
      message: 'Internal server error while fetching user details.',
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

// Controller for updating user details (e.g., username, email)
export const updateUserDetails = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.id;
  const { email, username }: { email: string; username: string } = req.body;

  if (!email || !username) {
    return res.status(400).json({ message: 'Email and username are required.' });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = email;
    user.username = username;

    await user.save();

    const { password: _, ...updatedUser } = user.toJSON();

    return res.status(200).json({
      message: 'User details updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user details:', error);
    return res.status(500).json({
      message: 'Internal server error while updating user details.',
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

// Controller for deleting a user
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    return res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      message: 'Internal server error while deleting user.',
      error: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};
