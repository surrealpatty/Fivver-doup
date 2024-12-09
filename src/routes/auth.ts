import { Router } from 'express';
import { User } from '../models/user'; // Corrected the casing to match the file name
import { ValidationError } from 'sequelize';
import { body, validationResult } from 'express-validator';
import { Op } from 'sequelize';  // Import Sequelize 'Op' for the OR condition

const router = Router();

// Route for user registration
router.post(
  '/register',
  // Validation middleware for email, username, and password
  body('email').isEmail().withMessage('Invalid email address'),
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // Handle user registration logic
  async (req, res): Promise<void> => {  // Explicit return type Promise<void>
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // Ensure we stop further processing
    }

    const { email, username, password } = req.body;

    try {
      // Check if user already exists by email or username
      const existingUser = await User.findOne({
        where: { [Op.or]: [{ email }, { username }] }, // Use Sequelize's 'Op' to check both fields
      });

      if (existingUser) {
        res.status(400).json({ message: 'Email or Username already in use' });
        return; // Ensure we stop further processing if the user already exists
      }

      // Hash password before saving
      const hashedPassword = await User.hashPassword(password);

      // Create a new user, add role and tier
      const newUser = await User.create({
        email,
        username,
        password: hashedPassword,
        role: 'free',  // Default role
        tier: 'free',  // Default tier
      });

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          tier: newUser.tier,
        },
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
  }
);

export default router;
