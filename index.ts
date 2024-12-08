import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { sequelize } from './config/database'; // Named import for sequelize (corrected path)
import { userRouter } from './routes/user';  // Named import for userRouter (corrected path)
import profileRouter from './routes/profile'; // Default import for profileRouter (corrected path)
import dotenv from 'dotenv'; // For loading environment variables

// Load environment variables from .env file
dotenv.config();

// Create Express app instance
const app = express();

// Set up the server port, defaulting to process.env.PORT or 3000
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for cross-origin requests (if needed)
app.use(cors());

// Example route to test the server
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Fiverr Clone!');
});

// Synchronize Sequelize models with the database
sequelize.sync({ alter: true }) // Using 'alter' to avoid data loss while updating models
  .then(() => {
    console.log('Models are synchronized with the database.');
  })
  .catch((error: Error) => {
    console.error('Error syncing models:', error);
  });

// Use the userRouter for routes starting with /api/users
app.use('/api/users', userRouter); // Register user routes under /api/users

// Register profile routes under /api/profile
app.use('/api/profile', profileRouter); // Register profile routes under /api/profile

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Global error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);  // Log the error
  res.status(500).json({ message: 'Something went wrong!' });  // Send a generic error response
});

// Start the server on the specified port
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app and server for use in tests or other parts of the application
export { app, server };
