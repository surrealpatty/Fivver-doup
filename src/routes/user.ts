// src/routes/user.ts
import { Router, Request, Response } from 'express';  // Import necessary types
import { User } from '@models/user';  // Correct import for User model
import { ValidationError } from 'sequelize'; // Import ValidationError for handling Sequelize errors
import { body, validationResult } from 'express-validator'; // Express validation middleware
import { Op } from 'sequelize';  // Import Sequelize 'Op' for the OR condition
import { authenticateToken } from '@middlewares/authenticateToken';  // Correct import for authenticateToken
import { AuthRequest } from '../types/authMiddleware';  // Correctly typed AuthRequest if needed

const router = Router();

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
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, username, password } = req.body;

    try {
      // Check if user already exists by email or username
      const existingUser = await User.findOne({
        where: { [Op.or]: [{ email }, { username }] },  // Check both email and username
      });

      if (existingUser) {
        res.status(400).json({ message: 'Email or Username already in use' });
        return;
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        email,
        username,
        password: hashedPassword,
        role: 'free',  // Default to free tier if needed
        tier: 'free',  // Default tier (can be updated
