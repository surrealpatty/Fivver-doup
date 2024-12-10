import express, { Request, Response } from 'express';

const userRouter = express.Router();

// Correct route handler signature
userRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'User routes are working!' });
});

export default userRouter;
