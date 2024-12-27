import dotenv from 'dotenv'; // Import dotenv to load environment variables
import express from 'express';
import sequelize from './config/database'; // Import the sequelize instance for database connection
import userRouter from './routes/user'; // Import the userRouter for handling user-related routes

// Load environment variables from .env file
dotenv.config(); // Ensure to load environment variables before using them

// Create an Express app instance
export const app = express(); 
const port = process.env.PORT || 3000; // Use environment variable PORT or default to 3000

// Middleware to parse JSON bodies
app.use(express.json());

// Use the userRouter for handling user-related routes
app.use('/users', userRouter); 

// Example route for the home page
app.get('/', (_, res) => {
  res.send('Welcome to Fiverr Clone!');
});

// Function to test the database connection
const testDatabaseConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate(); // Attempt to authenticate with the database
    console.log('Database connection established.');
  } catch (error: unknown) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    throw new Error('Database connection failed'); // Throw an error to stop further execution if the connection fails
  }
};

// Function to sync Sequelize models (with options to automatically alter the database schema)
const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: true }); // Alter database schema to match the models
    console.log('Database synchronized successfully');
  } catch (error: unknown) {
    console.error('Error synchronizing database:', error instanceof Error ? error.message : error);
    throw new Error('Database synchronization failed');
  }
};

// Function to initialize the database connection and synchronization process
const initializeDatabase = async (): Promise<void> => {
  try {
    await testDatabaseConnection(); // Test the database connection first
    await syncDatabase(); // Sync models with the database schema once the connection is established
  } catch (error: unknown) {
    console.error('Error initializing the database:', error instanceof Error ? error.message : error);
    process.exit(1); // Exit the application if database initialization fails
  }
};

// Initialize the database before starting the server
initializeDatabase()
  .then(() => {
    // Only start the server if the database connection and synchronization are successful
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Server failed to start due to database error:', error instanceof Error ? error.message : error);
    process.exit(1); // Exit if the server cannot start due to database issues
  });
