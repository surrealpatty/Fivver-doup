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
    process.exit(1); // Exit if the connection fails
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
    process.exit(1); // Exit if syncing fails
  }
};

// Initialize database connection and sync models
const initializeDatabase = async () => {
  await testDatabaseConnection(); // Ensure the database connection is established
  await syncDatabase(); // Sync the models once connected
};

// Call initializeDatabase before starting the server
initializeDatabase();

// Use the userRouter for handling /api/users routes
app.use('/api/users', userRouter); // Register the user routes under /api/users

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
