import express, { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

const generateToken = (user: User): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set');
  }

  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    jwtSecret,
    { expiresIn: '1h' }
  );
};

const router = express.Router();

// Register a new user.
router.post('/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  const { email, password, username, role } = req.body;

  try {
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Please provide email, password, and username.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user instance
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    const token = generateToken(newUser);

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

// Login an existing user.
router.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken(user);

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
