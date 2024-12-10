import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from '@config/database';  // Path alias for database config
import userRouter from '@routes/user';  // Path alias for userRouter

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());  // For parsing JSON requests
app.use(cors());  // For handling Cross-Origin Resource Sharing

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
