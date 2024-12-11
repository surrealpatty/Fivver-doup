// src/index.ts

// Ensure custom type augmentation is loaded first
import './types/express';  // Ensure this import is first to load the augmentation

// Import necessary modules
import express, { Request, Response, NextFunction } from 'express';  // Import Express and types
import cors from 'cors';                                           // Import CORS middleware
import { sequelize } from './config/database';                     // Correct import for sequelize
import userRouter from './routes/user';                             // Import userRouter
import profileRouter from './routes/profile';                       // Import profileRouter
import authRouter from './routes/auth';                             // Import authRouter
import dotenv from 'dotenv';                                        // Import dotenv for environment variables

dotenv.config();  // Load environment variables from .env

const app = express();  // Initialize Express app

// Set up the server port, defaulting to process.env.PORT or 3000
const port = process.env.PORT || 3000;  // Default port is 3000, can be overridden for testing

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS (if needed for handling cross-origin requests)
app.use(cors());

// Example route to test the server
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to Fiverr Clone!');
});

// Synchronize models with the database
sequelize.sync({ alter: true }) // Using 'alter' to ensure no data loss
  .then(() => {
    console.log('Models are synchronized with the database.');
  })
  .catch((error: Error) => {
    console.error('Error syncing models:', error);
  });

// Use the userRouter for routes starting with /api/users
app.use('/api/users', userRouter); // Register the user routes under /api/users

// Register the profile route under /api/profile
app.use('/api/profile', profileRouter); // Register profile route

// Register the auth route under /api/auth
app.use('/api/auth', authRouter); // Register auth route for user registration/login

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Global error handler middleware - Fix the signature with `NextFunction`
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {  // Added NextFunction
  console.error(err);  // Log the error
  res.status(500).json({ message: 'Something went wrong!' });  // Send generic error response
});

// Start the server on dynamic port (use process.env.PORT or 3000)
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app and server for use in tests or other parts of the application
export { app, server };  // Export both app and server instance for testing or server shutdown
