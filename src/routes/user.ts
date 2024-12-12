import { Router, Request, Response } from 'express';  // Import types from 'express'
import bcrypt from 'bcryptjs';
import { User } from '../models/user';  // Ensure the User model is imported

const router: Router = Router();

// Registration Route
router.post('/register', async (req: Request, res: Response) => {  // Use Request and Response types
  const { email, password, username, tier } = req.body;  // Get user data from request body

  try {
    // 1. Input validation (email, password, and username are required)
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Email, password, and username are required' });
    }

    // 2. Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // 3. Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new user (with default 'free' tier if not provided)
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      tier: tier || 'free',  // Default to 'free' if tier is not provided
      role: 'user',  // Set default role to 'user'
      isVerified: false,  // Default to 'false' if isVerified is not provided
    });

    // 5. Send success response
    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;  // Use ES module syntax for export
