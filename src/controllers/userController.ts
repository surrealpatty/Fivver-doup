import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';  // Make sure bcryptjs is installed or use bcrypt
import { User } from '../models/user';  // Assuming Sequelize User model
import { generateToken } from '../utils/jwt';  // JWT token generation helper

// Controller for registering a user
export const registerUser = async (req: Request, res: Response): Promise<Response> => {  // Update return type to Promise<Response>
  // Extract fields from request body with default values for optional fields
  const { email, password, username = 'default_username', role = 'user', tier = 'free', isVerified = false } = req.body;

  try {
    // Input validation: Ensure required fields are provided
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Email, username, and password are required.' });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      role,
      tier,
      isVerified,
    });

    // Generate a JWT token for the newly created user
    const token = generateToken(newUser);

    // Respond with user data (excluding sensitive information like the password) and the JWT token
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        tier: newUser.tier,
        isVerified: newUser.isVerified,
        createdAt: newUser.createdAt,
      },
      token,
    });
  } catch (error) {
    // Log the error for debugging and send a generic server error response
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
