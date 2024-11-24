// Import necessary modules and configurations
import express, { Request, Response, NextFunction } from 'express'; // Ensure types are available
import { sequelize, testConnection } from './config/database'; // Import sequelize and testConnection
import userRoutes from './routes/user'; // Import user routes, ensure userRoutes is a valid Express Router

// Initialize Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/users', userRoutes); // Attach userRoutes to the '/users' route

// Define a global error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ message: 'An internal server error occurred.' });
});

// Start the server and export the app and server
const server = app.listen(3000, async () => {
  try {
    // Test the database connection
    await testConnection(); // Reuse the testConnection utility
    console.log('Server is running on port 3000');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to the database:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
});

// Export the app and server for testing purposes
export { app, server };
