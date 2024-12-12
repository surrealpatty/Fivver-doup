import express from 'express';
import dotenv from 'dotenv';
import router from './routes'; // Import the exported router
import cors from 'cors';
import { sequelize } from './config/database';
dotenv.config();  // Load environment variables

const app = express();

// Middleware setup
app.use(cors());  // CORS middleware to handle cross-origin requests
app.use(express.json());  // To parse incoming JSON payloads

// Use the router for the app
app.use('/api', router);  // Prefix the routes with "/api"

// Test DB connection and start server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error: Error) => {  // Type the error parameter as `Error`
    console.error('Error connecting to the database:', error);
  });
