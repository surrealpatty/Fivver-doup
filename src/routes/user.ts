import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { User } from '../models';  // Ensure correct path to your User model

const router = Router();

// User Registration Route
router.post(
  '/register',
  // Validate user inputs
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email address'),
    check('username')
      .notEmpty()
      .withMessage('Username is required'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  // Define the route handler with a return type of void
  async (req: Request, res: Response): Promise<void> => {  // Return type is void
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;  // Ensure we stop here if validation fails
    }

    try {
      const { email, username, password } = req.body;

      // Check if user already exists by email
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;  // Stop execution if user exists
      }

      // Check if username already exists
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        res.status(400).json({ message: 'Username already taken' });
        return;  // Stop execution if username exists
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await User.create({
        email,
        username,
        password: hashedPassword
      });

      // Send success response with user data
      res.status(201).json({
        message: 'User created successfully',
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Export router to use in the main app
export default router;
