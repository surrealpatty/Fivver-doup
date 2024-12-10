import express, { Request, Response } from 'express';

const userRouter = express.Router();

// Correct route handler signature with explicit return type
userRouter.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: 'User routes are working!' });
});

export default userRouter;
