import express, { Request, Response } from 'express';

const userRouter = express.Router();
console.log(userRouter);  // Ensure this logs the correct express router

userRouter.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: 'User routes are working!' });
});

export default userRouter;
