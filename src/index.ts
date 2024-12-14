import express, { Application } from 'express';  // Import express and Application type
import dotenv from 'dotenv';  // For environment variables
import cors from 'cors';  // For Cross-Origin Resource Sharing
import userRoutes from './routes/user';  // Ensure correct path to user routes
import authRoutes from './routes/auth';  // Import auth routes for login/signup
import { sequelize } from './config/database';  // Ensure correct path to database configuration

dotenv.config();  // Load environment variables from the .env file

const app: Application = express();  // Initialize the Express application

// Middleware setup
app.use(cors());  // Enable CORS for all origins
app.use(express.json());  // Parse incoming JSON requests with express's built-in middleware

// Route setup
app.use('/api/users', userRoutes);  // Register user routes under /api/users
app.use('/api/auth', authRoutes);  // Register authentication routes under /api/auth

// Database connection and server start
const startServer = async (): Promise<void> => {
  try {
    // Authenticate the database connection
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    // Sync models with the database schema
    await sequelize.sync({ alter: true });  // Use `alter` for dev, avoid in prod
    console.log('Database schema synced successfully!');

    // Start the server after syncing the database schema
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1);  // Exit the process with a failure code
  }
};

// Start the server
startServer();

export default app;  // Export the app for testing or other purposes
