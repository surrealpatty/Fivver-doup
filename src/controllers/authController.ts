// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserCreationAttributes } from '../models';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error('JWT_SECRET is not set');
  process.exit(1);
}

/**
 * Register a new user
 */
export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, username, role } = req.body;

  try {
    // Validate required fields
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: 'Please provide email, password, and username.' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default to 'free' if role is not provided
    const userRole: 'free' | 'paid' = role === 'paid' ? 'paid' : 'free';

    const userData: UserCreationAttributes = {
      email: 'user@example.com', // Example email, adjust accordingly
      password: hashedPassword, // Use hashed password
      username: 'newuser', // Example username, adjust accordingly
      role: userRole,
    };

    // Create a new user in the database
    const newUser = await User.create(userData);

    // Generate a JWT token for the newly created user
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, username: newUser.username },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Return user info and token in the response
    return res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        isPaid: newUser.role === 'paid',
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res
      .status(500)
      .json({ message: 'Server error during user registration.' });
  }
};
