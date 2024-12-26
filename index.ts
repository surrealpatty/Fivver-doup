import dotenv from 'dotenv'; // Import dotenv to load environment variables
import express from 'express';
import { sequelize } from './config/database'; // Correct path for sequelize import
import userRouter from './routes/user'; // Correct path for userRouter import

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

// Use the userRouter to handle routes for users
app.use('/users', userRouter); // Make sure to use the userRouter for '/users' endpoint

// Database connection check and authentication
const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate(); // Attempt to authenticate with the database
    console.log('Database connection established.');
  } catch (error: any) {
    console.error('Unable to connect to the database:', error.message || error);
    throw new Error('Database connection failed'); // Throwing the error to stop further execution
  }
};

// Sync Sequelize models (alter: true is useful for development)
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use 'alter: true' for auto-syncing changes to the database schema
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
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
    throw new Error('Database initialization failed'); // Gracefully handle error instead of terminating process
  }
};

// Initialize app only after database setup is successful
initializeDatabase()
  .then(() => {
    // Start the server only if the database connection and sync are successful
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    // Log the error but don't call process.exit()
    console.error('Server failed to start due to database error:', error.message || error);
  });
