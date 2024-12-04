import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database';  // Import sequelize instance
import userRouter from './routes/user';  // Import the user routes
import dotenv from 'dotenv';  // To load environment variables

// Load environment variables from .env file
dotenv.config();

// Create Express app instance
const app = express();

// Set up the server port
const port = process.env.PORT || 3000; // Port is now 3000

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

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app for use in testing or elsewhere (if necessary)
export { app };  // Optional: Exporting app in case it's needed for tests or elsewhere
