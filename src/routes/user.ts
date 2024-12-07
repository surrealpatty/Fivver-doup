// src/routes/user.ts
import express from 'express';

const userRouter = express.Router();

// Define your routes here
userRouter.get('/', (req, res) => {
  res.send('User routes');
});

// Ensure named export is correct
export { userRouter };  // Correctly export the userRouter
