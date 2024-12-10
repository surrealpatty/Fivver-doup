import express, { Request, Response } from 'express';

const userRouter = express.Router();

// Example route handler with correct signature
userRouter.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: 'User routes are working!' });
});

export default userRouter;
