import { Router, Request, Response, NextFunction } from 'express';
import { User } from '@models/user';  // Ensure the correct import path for your User model

const userRouter: Router = Router();  // Correctly using Router()

// Example login route

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Handle password validation and token generation logic here
    return res.json({ message: 'Login successful' });

  } catch (error) {
    console.error(error);
    next(error);  // Pass the error to the global error handler
  }
});

export { userRouter };  // Export the userRouter correctly
