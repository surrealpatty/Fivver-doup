import dotenv from 'dotenv'; // Import dotenv to load environment variables
import express from 'express';
import sequelize from '@config/database'; // Correctly import sequelize as a default export
import userRouter from './routes/user'; // Import the userRouter for handling user-related routes

// Load environment variables from .env file
dotenv.config(); // Ensure to load environment variables before using them

export const app = express(); // Named export for app
const port = process.env.PORT || 3000; // Use environment variable PORT or default to 3000

// Middleware to parse JSON bodies
app.use(express.json());

// Use the userRouter for handling user-related routes
app.use('/users', userRouter); // Now userRouter is utilized

// Example route
app.get('/', (_, res) => {
  // Replace 'req' with '_' to indicate it's unused
  res.send('Welcome to Fiverr Clone!');
});

// Database connection check and authentication
const testDatabaseConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate(); // Attempt to authenticate with the database
    console.log('Database connection established.');
  } catch (error: unknown) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    // Throwing the error to stop the process in a controlled manner
    throw new Error('Database connection failed');
  }
};

// Sync Sequelize models (alter: true is useful for development)
const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: true }); // Use 'alter: true' for auto-syncing changes to the database schema
    console.log('Database synchronized successfully');
  } catch (error: unknown) {
    console.error('Error synchronizing database:', error instanceof Error ? error.message : error);
    // Throw error to prevent server startup if syncing fails
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
      // In test environment, throw the error to allow Jest to finish its cleanup
      throw new Error('Database initialization failed during testing.');
    } else {
      // In production, exit the process to prevent starting a broken server
      process.exit(1);
    }
  }
};

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
    console.error(
      'Server failed to start due to database error:',
      error instanceof Error ? error.message : error
    );
  });
