import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';  // Ensure bcryptjs is installed or use bcrypt
import User from '../models/user';  // Sequelize User model
import { generateToken } from '../utils/jwt';  // JWT token generation helper

// Controller for registering a new user
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password, tier = 'free' } = req.body;

  try {
    // Input validation: Ensure all required fields are provided
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, username, and password are required.' });
    }

    // Check if the user already exists by email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    // Hash the user's password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role and isVerified properties (assuming 'user' is the default role and false is default for isVerified)
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      tier,  // Optional tier (defaults to 'free')
      role: 'user',  // Default role
      isVerified: false,  // Default verification status
    });

    // Generate a JWT token for the new user
    const token = generateToken(newUser);

    // Respond with the user data and the JWT token (excluding password)
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,  // Assuming role is set to 'user' by default
        tier: newUser.tier,
        isVerified: newUser.isVerified,
        createdAt: newUser.createdAt,
      },
      token,
    });
  } catch (error) {
    // Log the error and respond with a generic server error message
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
