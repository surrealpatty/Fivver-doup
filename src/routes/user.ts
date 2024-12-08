// src/routes/user.ts
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';  // Import User model

const userRouter = Router();

// User Login Route
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ where: { email } });

    // If user not found
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token on successful login
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_secret', {
      expiresIn: '1h',
    });

    // Send token in response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export userRouter for use in other parts of the app
export { userRouter };
