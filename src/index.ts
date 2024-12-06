import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database'; // Named import for sequelize
import userRouter from './routes/user'; // Import user routes
import profileRouter from './routes/profile'; // Default import for profile router
import dotenv from 'dotenv'; // For loading environment variables

// Load environment variables from .env file
dotenv.config();

// Create Express app instance
const app = express();

// Set up the server port, defaulting to process.env.PORT or 3000
const port = process.env.PORT || 3000; // Default port is 3000, can be overridden for testing

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS (if needed for handling cross-origin requests)
app.use(cors());

// Example route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to Fiverr Clone!');
});

// Synchronize models with the database
sequelize.sync({ alter: true }) // Using 'alter' to ensure no data loss
  .then(() => {
    console.log('Models are synchronized with the database.');
  })
  .catch((error: Error) => {
    console.error('Error syncing models:', error);
  });

// Use the userRouter for routes starting with /api/users
app.use('/api/users', userRouter); // Register the user routes under /api/users

// Register the profile route under /api/profile
app.use('/api/profile', profileRouter); // Register profile route

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server on dynamic port (use process.env.PORT or 3000)
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app and server for use in tests or other parts of the application
export { app, server }; // Export both app and server instance for testing or server shutdown
