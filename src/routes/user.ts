import express, { Router } from 'express';

const userRouter = Router();

// Define your routes here, e.g.:
userRouter.get('/', (req, res) => {
  res.send('User route');
});

export default userRouter;  // Default export
