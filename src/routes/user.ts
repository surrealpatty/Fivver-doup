import { Router, Request, Response } from 'express';  // Properly type `Request` and `Response`
import { body, validationResult } from 'express-validator'; // Validation libraries
import bcrypt from 'bcryptjs';  // Correct import for bcrypt
import { User } from '../models/user';  // Import the User model
import { generateToken } from '../utils/jwt';  // Import the generateToken function

const router = Router();

// User registration route
router.post(
  '/register',
  [
    // Validation middleware
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').optional().isString().withMessage('Username must be a string'), // Optional field
    body('role').optional().isIn(['user', 'admin']).withMessage('Role must be either user or admin'), // Optional field
    body('tier').optional().isIn(['free', 'paid']).withMessage('Tier must be either free or paid'), // Optional field
    body('isVerified').optional().isBoolean().withMessage('isVerified must be a boolean value'), // Optional field
  ],
  async (req: Request, res: Response): Promise<Response> => {  // Type the parameters and set return type as Response
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract the request body fields
    const { email, password, username, role, tier, isVerified } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await User.create({
        email,
        password: hashedPassword,
        username: username || 'default_username', // Use a default if not provided
        role: role || 'user', // Default to 'user' if not provided
        tier: tier || 'free', // Default to 'free' if not provided
        isVerified: isVerified || false, // Default to false if not provided
      });

      // Generate JWT token
      const token = generateToken(user);

      // Respond with the user data and token
      return res.status(201).json({ 
        user: { 
          id: user.id, 
          email: user.email, 
          username: user.username 
        }, 
        token 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
