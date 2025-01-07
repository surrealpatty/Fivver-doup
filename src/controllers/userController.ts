import { Request, Response } from 'express';
import { User, UserRole, UserTier } from '../models/user';

// Controller for fetching user details by ID
export const getUserDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Extract user ID from the request parameters
    const userId = req.params.id;

    // Fetch the user from the database using the provided ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Exclude sensitive data (e.g., password) from the user data
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
  const { email, username }: { email: string, username: string } = req.body;

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

    // Exclude sensitive data (password) from the response
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
