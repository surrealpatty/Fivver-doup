import express, { Request, Response, NextFunction } from 'express';
import { testConnection } from './config/database'; // Ensure this is for testing DB connection
import userRouter from './routes/user'; // Use correct route for user-related endpoints
import { sequelize } from './config/database'; 
import dotenv from 'dotenv';
import User from './models/user'; // Import User model

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use userRouter for handling user-related routes under the /api/users endpoint
app.use('/api/users', userRouter); // Correct route registration

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message); // Log the error
  res.status(500).json({ message: 'An internal server error occurred.' });
});

// Start the server and test the database connection
const server = app.listen(3000, async () => {
  try {
    await testConnection(); // Test database connection
    console.log('Server is running on port 3000');
    
    // Fetch users after the server has started
    User.findAll()
      .then((users: User[]) => {  // Explicitly type 'users' as an array of User objects
        console.log('Users:', users); // Log fetched users
      })
      .catch((error: Error) => {
        console.error('Error fetching users:', error);
      });
    
  } catch (error) {
    console.error(
      'Error connecting to the database:',
      error instanceof Error ? error.message : error
    );
  }
});

export { app, server }; // Export app and server for testing purposes
