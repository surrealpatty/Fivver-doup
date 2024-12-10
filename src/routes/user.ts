import express, { Request, Response } from 'express';

const userRouter = express.Router();

// Example route handler
userRouter.get('/', (_req: Request, res: Response): Response => {
  return res.json({ message: 'User routes are working!' });
});

export default userRouter;
