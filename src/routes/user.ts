import { Router, Request, Response, NextFunction } from 'express';
import { registerUser } from '../controllers/userController';

const userRouter = Router();

// Define the /register POST route
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Call the registerUser controller to handle the registration logic
    await registerUser(req, res);
  } catch (error) {
    // If an error occurs, pass it to the next middleware
    next(error);
  }
});

export default userRouter;
