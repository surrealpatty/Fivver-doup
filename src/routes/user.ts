import { Router } from 'express';
import { User } from '@models/user'; // Adjust the path to your model

const userRouter = Router();

userRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Add password validation and token logic here
    return res.json({ message: 'Login successful' });

  } catch (error) {
    console.error(error);
    next(error); // Pass error to the global error handler
  }
});

export { userRouter };
