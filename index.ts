import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from '@config/database';  // Use the path alias for the database config
import { userRouter } from '@routes/user';  // Correctly import userRouter

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Mount the userRouter at /api/users
app.use('/api/users', userRouter);  // Correct use of app.use() with router

// Sync Sequelize models
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Models are synchronized with the database.');
  })
  .catch((error: Error) => {
    console.error('Error syncing models:', error);
  });

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app, server };
