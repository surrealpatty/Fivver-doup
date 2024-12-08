import { Router, Request, Response, NextFunction } from 'express'; // Import necessary types
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@models/user'; // Correct import path based on your tsconfig

// Declare the userRouter as a Router instance
export const userRouter: Router = Router();

// User Login Route
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  try {
    // Find the user in the database using Sequelize model
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

    // Send the token in response
    return res.json({ token });
  } catch (error) {
    console.error(error);
    next(error); // Pass error to error handling middleware
  }
});

// Other user-related routes can be added here

