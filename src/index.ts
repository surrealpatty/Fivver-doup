// src/index.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';  // Import body-parser
import { sequelize } from './config/database'; // Import sequelize instance
import userRoutes from './routes/user'; // Import user routes
import protectedRoutes from './routes/protectedRoute'; // Import protected routes
import serviceRoutes from './routes/service';  // Corrected import

dotenv.config();

const app: Application = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json());  // Parse JSON bodies

// Route setup
app.use('/api/users', userRoutes);  // User routes for registration/login
app.use('/api', protectedRoutes);  // Protected routes
app.use('/api/services', serviceRoutes);  // Service routes

/**
 * Function to sync the database
 * Sync the schema with `alter: true` to safely update existing tables
 */
const syncDatabase = async (): Promise<void> => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();  // Authenticate the connection
    console.log('Database connected successfully!');

    // Sync database schema
    console.log('Syncing database schema...');
    await sequelize.sync({ alter: true }); // Sync with alterations (safe updates)
    console.log('Database schema synced successfully!');
  } catch (error) {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1);  // Exit the process if the connection or sync fails
  }
};

/**
 * Function to start the server
 * Sync the database first, then start listening on the specified port
 */
const startServer = async (): Promise<void> => {
  await syncDatabase(); // Ensure the database is synced before starting the server

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

// Start the server
startServer();

export default app;
