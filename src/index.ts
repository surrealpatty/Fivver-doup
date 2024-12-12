import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';
import { sequelize } from './config/database';

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Use the router for the app
app.use('/api', router);

// Test DB connection and start server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to the database:', error);
  });

export default app;