// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user'; // Adjust path if needed


// Ensure JWT_SECRET exists
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error('JWT_SECRET is not set');
}

// Register and login a user based on the route
export const userController = {
  // Register a new user
  registerUser: async (req: Request, res: Response): Promise<Response> => {
    const { email, password, username, role }: { email: string, password: string, username: string, role?: string } = req.body;

    try {
      // Validate required fields
      if (!email || !password || !username) {
        return res.status(400).json({ message: 'Please provide email, password, and username.' });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Determine if the user is paid or not
      const isPaid = role === 'paid'; // Default to false if 'paid' is not specified

      // Create a new user in the database
      const newUser = await User.create({
        email,
        password: hashedPassword,
        username,
        role: isPaid ? 'paid' : 'free', // Ensure role is correctly assigned
      });

      // Generate a JWT token
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, username: newUser.username },
        jwtSecret,
        { expiresIn: '1h' }
      );

      // Return user info and token
      return res.status(201).json({
        message: 'User registered successfully.',
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          isPaid: newUser.role === 'paid', // Use the 'role' to compute 'isPaid'
        },
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Server error during user registration.' });
    }
  },

  // Login an existing user
  loginUser: async (req: Request, res: Response): Promise<Response> => {
    const { email, password }: { email: string, password: string } = req.body;

    try {
      // Validate incoming data
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
      }

      // Find the user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }

      // Compare the password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        jwtSecret,
        { expiresIn: '1h' }
      );

      // Return the token and user info
      return res.status(200).json({
        message: 'Login successful.',
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          isPaid: user.role === 'paid', // Use the 'role' to compute 'isPaid'
        },
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).json({ message: 'Server error during user login.' });
    }
  },
};

// Separate functions for testing purposes (optional)
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  const { username, email, password } = userData;

  // This should ideally call the same logic as above for registration
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role: 'free', // Default to free user
  });

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    jwtSecret,
    { expiresIn: '1h' }
  );

  return { token, user };
};
