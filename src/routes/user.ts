import express, { Request, Response } from 'express';
import User from '../models/user'; // Ensure the path is correct
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Define the expected shape of request body for TypeScript
interface RegisterRequestBody {
  email: string;
  password: string;
  username: string;
  role?: string; // Role is optional
}

interface LoginRequestBody {
  email: string;
  password: string;
}

/**
 * Register a new user.
 */
router.post('/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<Response> => {
  const { email, password, username, role } = req.body;

  try {
    // Validate the incoming data
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

    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user', // Default to 'user' if role is not provided
    });

    // Ensure JWT_SECRET is present in the environment variables
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret is not configured properly.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, username: newUser.username },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Send the response with the token
    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Server error during user registration.' });
  }
});

/**
 * Login an existing user.
 */
router.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    // Validate the incoming data
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Ensure JWT_SECRET is present in the environment variables
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret is not configured properly.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Send the response with the token
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Server error during user login.' });
  }
});

export default router;
