import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // Ensure consistent import
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

// User Registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password } = req.body;

  try {
    // Input validation
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if user already exists by email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ email, username, password: hashedPassword });

    // Send success response with user data (excluding password for security)
    res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error during user registration' });
  }
};

// User Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if the user exists by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token (use environment variable for secret key)
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'your-default-secret', // Use a default secret if not set
      { expiresIn: '1h' } // Token expiration time
    );

    // Send the token in the response
    res.status(200).json({
      message: 'Login successful',
      token, // Send JWT token to the user
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
