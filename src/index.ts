import 'reflect-metadata'; // Import reflect-metadata before other imports
import express, { Application, Request, Response, NextFunction } from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/database'; 
import { userRoutes } from './routes/user'; 
import profileRoutes from './routes/profile'; 
import { authenticateToken } from './middlewares/authenticateToken'; 

dotenv.config(); // Load environment variables from .env file

const app: Application = express(); // Explicitly type the app as Application

// Middleware setup
app.use(cors()); 
app.use(express.json()); 

// Routes setup
app.use('/api/users', userRoutes); 
app.use('/api/profile', authenticateToken, profileRoutes); // Corrected path for profile routes

// Database connection and schema synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    return sequelize.sync({ alter: true }); // Adjust alter or force based on environment
  })
  .then(() => {
    console.log('Database schema synced successfully!');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database or syncing schema:', error);
  });

export default app;

// Define CustomAuthRequest interface (within src/index.ts or a separate file)
interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email: string; // Ensure email is a required string property
    username?: string; // Optional username property
  };
}