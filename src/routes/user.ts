import { Router, Request, Response, NextFunction } from 'express';
import { User } from '@models/user'; // Adjust the path as necessary

const userRouter: Router = Router();

userRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ where: { email } });

      if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
      }

      // Add password validation and token logic here
      res.json({ message: 'Login successful' });
    } catch (error) {
      next(error); // Pass error to Express's error handler
    }
  }
);

export { userRouter };
