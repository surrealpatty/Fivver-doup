import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/user';  // Correct import for User model

const userRouter: Router = Router();  // Correct instantiation of Router

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

    return res.json({ message: 'Login successful' });  // Modify as needed for your logic

  } catch (error) {
    console.error(error);
    next(error);  // Pass the error to the global error handler
  }
});

export { userRouter };  // Correctly export the router
