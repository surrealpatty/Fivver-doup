import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';  // Make sure to have your User model set up
import { generateToken } from '../utils/jwt';  // Import the JWT helper

const router = express.Router();

// User registration (signup)
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req: Request, res: Response) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username = 'default_username', role = 'user', tier = 'free', isVerified = false } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user with required fields
      const user = await User.create({
        email,
        password: hashedPassword,
        username,
        role,
        tier,
        isVerified,
      });

      // Generate JWT token
      const token = generateToken(user);

      // Respond with the user data and token
      res.status(201).json({ user: { id: user.id, email: user.email, username: user.username }, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
