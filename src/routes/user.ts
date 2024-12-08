import { Router, Request, Response, NextFunction } from 'express';
import { User } from '@models/user';  // Adjust if necessary for your project structure

const userRouter: Router = Router();  // Ensure it's Router, not Application

// Example login route
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
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

export { userRouter };  // Make sure you export it correctly as a named export
