import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserCreationAttributes } from '../models/user'; // Import the User model
import { UserPayload } from '../types';  // Import UserPayload to use for type definition

// Controller for User Registration (Signup)
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password } = req.body;

  // Validate input
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Email, username, and password are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Create the new user in the database (id is handled automatically)
    const newUser: UserCreationAttributes = {
      email,
      username,
      password: hashedPassword,
      role: 'user', // Default role (can be modified)
      tier: 'free', // Default tier should be "free"
      isVerified: false, // Assuming user isn't verified initially
    };

    const user = await User.create(newUser); // Pass newUser as the object to create

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'your_jwt_secret', // Secret key for JWT (use environment variable)
      { expiresIn: '1h' } // Expiry time of the token
    );

    // Send back response with token
    return res.status(201).json({
      message: 'User registered successfully',
      token,  // Send the generated token
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Controller for fetching user profile
export const getUserProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Type the user correctly to include `tier`
    const user = req.user as UserPayload; // Cast `req.user` to UserPayload to include `tier`

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    return res.status(200).json({
      message: 'Profile fetched successfully',
      user: {
        id: user.id,
        email: user.email || 'No email provided',
        username: user.username || 'Anonymous',
        tier: user.tier || 'Free', // Fallback to 'Free' if no tier provided
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
