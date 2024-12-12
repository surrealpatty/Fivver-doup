import express from 'express';
import dotenv from 'dotenv';
import router from './routes';  // Import your routes
import cors from 'cors';
import { sequelize } from './config/database';

dotenv.config();  // Load environment variables

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Use the router for the app
app.use('/api', router);  // Prefix routes with /api

// Test DB connection and start server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to the database:', error);
  });

export default app;
