import 'reflect-metadata'; // Import reflect-metadata before other imports
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/database'; // Ensure correct relative path for database config
import { userRoutes } from './routes/user'; // Ensure correct relative path for user routes
import protectedRoute from './routes/protectedRoute'; // Import the protected route
import { authenticateToken } from './middlewares/authenticateToken'; // Import the authenticateToken middleware

dotenv.config(); // Load environment variables from .env file

const app: Application = express(); // Explicitly type the app as Application

// Middleware setup
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies in incoming requests

// Routes setup
app.use('/api/users', userRoutes); // Register user routes under /api/users
app.use('/api', authenticateToken, protectedRoute); // Register protected routes under /api with authentication middleware

// Test the database connection and sync the schema
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');

    // Sync models with the database schema
    return sequelize.sync({ alter: true }); // Adjust alter or force based on environment
  })
  .then(() => {
    console.log('Database schema synced successfully!');

    // Start the server after syncing the database schema
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to the database or syncing schema:', error);
  });

export default app; // Export the app for testing or other purposes
