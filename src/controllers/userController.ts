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

    // Create new user
    const newUser = await User.create({ username, email, password: hashedPassword });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Error registering user',
    });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },  // Payload containing user id and email
      process.env.JWT_SECRET!,            // Use the secret key from environment variables
      { expiresIn: '1h' }                 // Token expiration time (1 hour)
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Error logging in user',
    });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if the authenticated user is the one requesting the update
    if (req.user?.id !== id) {
      return res.status(403).json({ message: 'You are not authorized to update this profile' });
    }

    // Update user details in the database
    const [updated] = await User.update(updates, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve updated user details
    const updatedUser = await User.findByPk(id);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Error updating user',
    });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    // Check if the authenticated user is the one requesting the delete
    if (req.user?.id !== id) {
      return res.status(403).json({ message: 'You are not authorized to delete this account' });
    }

    // Delete user from the database
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Error deleting user',
    });
  }
};
