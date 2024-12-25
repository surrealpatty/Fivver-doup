import dotenv from 'dotenv'; // Import dotenv to load environment variables
import express from 'express';
import { sequelize } from './config/database'; // Path to the sequelize instance
import userRouter from './routes/user'; // Path to userRouter

// Load environment variables from .env file
dotenv.config(); // Make sure to load environment variables before using them

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to Fiverr Clone!');
});

// Database connection check
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });

// Sync Sequelize Models
const syncDatabase = async () => {
  try {
    // Ensure models are registered before calling sync
    await sequelize.sync({ alter: true }); // Use 'alter: true' to modify tables if needed (for development)
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

// Ensure models are initialized before syncing the database
syncDatabase();

// Use the userRouter for routes starting with /api/users
app.use('/api/users', userRouter); // Register the user routes under /api/users

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app as the default export and for testing
export default app; // Default export for app
