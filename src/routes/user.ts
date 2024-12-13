import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user'; // Make sure the path to User is correct

const router = Router();

// POST /api/users/register - User Registration Route
router.post('/register', async (req, res) => {
  const { email, password, username, tier } = req.body;

  try {
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Email, password, and username are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      tier: tier || 'free', // Default tier is 'free'
      role: 'user',
      isVerified: false,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        tier: newUser.tier,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
