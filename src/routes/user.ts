import { Router, Request, Response, NextFunction } from 'express';

const userRouter = Router();

// Correct route handler signature
userRouter.get('/', (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Add your route logic here
    res.status(200).json({ message: 'User routes are working!' });
  } catch (error) {
    // Handle any errors by passing them to the next middleware
    next(error);
  }
});

export default userRouter;
