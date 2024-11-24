import express, { Request, Response, NextFunction } from 'express';  // Import types from express
import { testConnection } from './config/database';  // Import only the testConnection utility
import userRouter from './routes/user';  // Import userRouter for handling user-related routes

// Initialize Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use userRouter for handling user routes under the /api/users endpoint
app.use('/api/users', userRouter);

// Define a global error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);  // Log the error
  res.status(500).json({ message: 'An internal server error occurred.' });  // Respond with an error message
});

// Start the server and test the database connection
const server = app.listen(3000, async () => {
  try {
    // Test the database connection using the utility
    await testConnection();  // Ensure testConnection is correctly implemented and available
    console.log('Server is running on port 3000');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to the database:', error.message);  // Log any database connection errors
    } else {
      console.error('An unknown error occurred:', error);  // Log any unexpected errors
    }
  }
});

// Export the app and server for testing purposes
export { app, server };
