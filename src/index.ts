import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import { sequelize } from '@config/database';  // Correct named import

import userRouter from './routes/user'; // Import userRouter for user-related routes

// Load environment variables from .env file
dotenv.config(); // Ensure to load environment variables before using them

const app = express(); // Initialize Express app
const port = process.env.PORT || 3000; // Use environment variable PORT or default to 3000

// Middleware to parse JSON request bodies
app.use(express.json());

// User routes (e.g., /api/users route)
app.use('/api/users', userRouter); 

// Example route
app.get('/', (_, res) => {
  res.send('Welcome to Fiverr Clone!');
});

// Database connection check and authentication
const testDatabaseConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate(); // Attempt to authenticate with the database
    console.log('Database connection established.');
  } catch (error: unknown) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    throw new Error('Database connection failed');
  }
};

// Sync Sequelize models (force: true will drop and recreate tables)
const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: false }); // Set force: true for dev, force: false for prod
    console.log('Database synchronized successfully');
  } catch (error: unknown) {
    console.error('Error synchronizing database:', error instanceof Error ? error.message : error);
    throw new Error('Database synchronization failed');
  }
};

// Initialize database connection and sync models
const initializeDatabase = async (): Promise<void> => {
  try {
    await testDatabaseConnection(); // Ensure the database connection is established
    await syncDatabase(); // Sync the models once connected
  } catch (error: unknown) {
    console.error('Error initializing the database:', error instanceof Error ? error.message : error);

    if (process.env.NODE_ENV === 'test') {
      throw new Error('Database initialization failed during testing.');
    } else {
      process.exit(1); // Exit if the database connection or sync fails
    }
  }
};

// Global error-handling middleware
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', error); // Log the error for debugging
  res.status(500).json({ message: error.message || 'Internal Server Error' });
});

// Call initializeDatabase before starting the server
initializeDatabase()
  .then(() => {
    // Start the server only if the database connection and sync are successful
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    // If database initialization fails, log the error and prevent server start
    console.error('Server failed to start due to database error:', error instanceof Error ? error.message : error);
  });

// Export the app instance for use elsewhere, like in tests
export { app }; // Export the app instance
