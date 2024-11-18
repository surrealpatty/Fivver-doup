// src/routes/userRoutes.ts
import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user'; // Ensure User model is imported correctly
import bcrypt from 'bcryptjs'; // For password hashing
import authMiddleware from '../middlewares/authMiddleware'; // For JWT auth middleware

const router = Router();

// 1. User Registration Route (POST /register)
router.post(
  '/register',
  [
    // Validation checks
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').isString().withMessage('Username must be a string'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username, isPaid } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        username,
        isPaid,
      });

      // Respond with the created user (excluding password)
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          isPaid: newUser.isPaid,
        },
      });
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// 2. User Login Route (POST /login) - to return JWT token
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the entered password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = user.generateAuthToken(); // Assuming you have a method in your model to generate token

      res.json({
        message: 'Login successful',
        token,
      });
    } catch (error) {
      console.error('Error logging in user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// 3. Get User Profile Route (GET /profile)
router.get('/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; // Assuming the user ID is decoded from the JWT token

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user profile information (excluding password)
    res.json({
      email: user.email,
      username: user.username,
      isPaid: user.isPaid,
      role: user.role,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 4. Update User Profile Route (PUT /profile)
router.put(
  '/profile',
  authMiddleware,
  [
    body('username').optional().isString().withMessage('Username must be a string'),
    body('email').optional().isEmail().withMessage('Please include a valid email'),
    body('isPaid').optional().isBoolean().withMessage('isPaid must be a boolean'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user!.id; // Get user ID from the JWT token
    const { username, email, isPaid } = req.body;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user fields
      user.username = username || user.username;
      user.email = email || user.email;
      user.isPaid = isPaid !== undefined ? isPaid : user.isPaid;

      await user.save(); // Save the changes

      res.json({
        message: 'User profile updated successfully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          isPaid: user.isPaid,
        },
      });
    } catch (error) {
      console.error('Error updating user profile:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;
