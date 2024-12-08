import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from '@config/database';  // Using alias for database config
import { userRouter } from '@routes/user';  // Correct import for userRouter

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Register userRouter for /api/users routes
app.use('/api/users', userRouter);  // Correct usage of the router

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
