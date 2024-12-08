import { Router, Request, Response, NextFunction } from 'express';  // Import necessary types
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from 'models/user';  // Ensure correct import path based on your tsconfig

const userRouter: Router = Router();  // Initialize express router

// User Login Route
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, password } = req.body;  // Destructure email and password from the request body

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
    next(error);  // Pass error to error handling middleware
  }
});

// Export userRouter for use in other parts of the app
export { userRouter };
