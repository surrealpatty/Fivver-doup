import dotenv from 'dotenv'; // Import dotenv to load environment variables
import express from 'express';
import { sequelize } from './config/database'; // Import the sequelize instance from the correct path
import userRouter from './routes/user'; // Import the userRouter for handling user-related routes

// Load environment variables from .env file
dotenv.config(); // Ensure to load environment variables before using them

export const app = express(); // Named export for app
const port = process.env.PORT || 3000; // Use environment variable PORT or default to 3000

// Middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to Fiverr Clone!');
});

// Database connection check and authentication
const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate(); // Attempt to authenticate with the database
    console.log('Database connection established.');
  } catch (error: any) {
    console.error('Unable to connect to the database:', error.message || error);
    // Instead of process.exit, log and throw the error to allow Jest to finish its cleanup
    throw new Error('Database connection failed'); // Throwing the error to stop the process in a controlled manner
  }
};

// Sync Sequelize models (alter: true is useful for development)
const syncDatabase = async () => {
  try {
    // Ensure models are registered before calling sync
    await sequelize.sync({ alter: true }); // Use 'alter: true' for auto-syncing changes to the database schema
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
    // Throw error to prevent server startup if syncing fails
    throw new Error('Database synchronization failed');
  }
};

// Initialize database connection and sync models
const initializeDatabase = async () => {
  try {
    await testDatabaseConnection(); // Ensure the database connection is established
    await syncDatabase(); // Sync the models once connected
  } catch (error) {
    console.error('Error initializing the database:', error);
    // You could handle this error based on your specific requirements
    // For now, we throw to prevent starting the server with a broken database setup
    process.exit(1);
  }
};

// Call initializeDatabase before starting the server
initializeDatabase().then(() => {
  // Start the server only if the database connection and sync are successful
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  // If database initialization fails, log the error and prevent server start
  console.error('Server failed to start due to database error:', error.message || error);
});
