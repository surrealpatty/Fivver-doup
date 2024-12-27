import dotenv from 'dotenv';  // Import dotenv to load environment variables
import express from 'express';
import { sequelize } from '@config/database'; // Use @config instead of relative paths
import userRouter from '@routes/user'; // Use @routes instead of relative paths


// Load environment variables from .env file based on NODE_ENV
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `./.env.${env}` });

export const app = express(); 
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Fiverr Clone!');
});

app.use('/users', userRouter);

// Database connection and sync logic here...
