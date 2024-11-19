import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/authMiddleware';
import User from '../models/user';

const router = Router();

// Utility function to generate JWT token
const generateAuthToken = (userId: number) => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secret from your env
  const expiresIn = '1h'; // Token expiration
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

// 1. User Registration Route (POST /register)
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').isString().withMessage('Username must be a string'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username, isPaid = false } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashedPassword, username, isPaid });

      // Generate JWT token after successful registration
      const token = generateAuthToken(newUser.id);

      res.status(201).json({
        message: 'User registered successfully',
        user: { id: newUser.id, email: newUser.email, username: newUser.username, isPaid: newUser.isPaid },
        token, // Include token in the response
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
      } else {
        console.error('Unknown error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
);

// 3. Get User Profile Route (GET /profile)
interface UserRequest extends Request {
  user?: { id: number };
}

router.get('/profile', authMiddleware, async (req: UserRequest, res: Response) => {
  const userId = req.user?.id;
  // Handle logic
});

  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      username: user.username,
      isPaid: user.isPaid,
      role: user.role,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching user profile:', error.message);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export default router;
