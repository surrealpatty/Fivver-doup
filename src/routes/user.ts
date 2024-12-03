import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { User } from '../models';  // Assuming you have a Sequelize User model
import { sendEmail } from '../services/emailService';  // Import email service

const router = Router();

// User Registration Route
router.post(
  '/register',
  // Validate user inputs
  [
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('username').notEmpty().withMessage('Username is required'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  async (req: Request, res: Response): Promise<void> => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // Explicit return to satisfy the TypeScript `void` requirement
    }

    try {
      const { email, username, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return; // Explicit return after error response
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await User.create({
        email,
        username,
        password: hashedPassword
      });

      // Optionally send a welcome email
      const emailDetails = {
        to: user.email,
        subject: 'Welcome to Our Platform!',
        text: `Hello ${user.username}, welcome to our platform. We're glad to have you!`
      };
      await sendEmail(emailDetails);

      // Send success response
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Test email route (useful for testing your email service)
router.get('/test-email', async (req: Request, res: Response): Promise<void> => {
  try {
    const emailDetails = {
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email sent from the email service.'
    };

    // Send test email
    await sendEmail(emailDetails);

    res.status(200).json({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending test email.' });
  }
});

// Other user-related routes (e.g., login, profile update) would go here

export default router;
