import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // Ensure bcryptjs is installed or use bcrypt
import { User } from '../models/user'; // Sequelize User model
import { generateToken } from '../utils/jwt'; // JWT token generation helper

// Controller for logging in a user
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    // Input validation: Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token for the user
    const token = generateToken(user);

    // Respond with user data (excluding sensitive information like password) and the JWT token
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        tier: user.tier,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    // Log the error for debugging and send a generic server error response
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

// Example function to get a user by email (optional for testing)
export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user data
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
