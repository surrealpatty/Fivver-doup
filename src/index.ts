import express from 'express';
import dotenv from 'dotenv';  // For loading environment variables
import { sequelize } from '@config/database';  // Correct path for sequelize config
import apiRoutes from './routes/api';  // Importing api routes (includes /services, etc.)
import userRouter from './routes/user';  // User routes
import testEmailRoute from './routes/testEmailRoute';  // Test email route
import { User } from '@models/user';  // Correct model path for User

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Verify necessary environment variables are set
const port = process.env.PORT || 3000; // Default to 3000 if not provided
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

if (!dbName || !dbUser || !dbPassword || !dbHost) {
  console.error('Missing required environment variables for database connection.');
  process.exit(1); // Exit the app if critical variables are missing
}

// Middleware to parse JSON bodies
app.use(express.json());

// Register routes
app.use('/api/users', userRouter); // All user-related routes
app.use('/api', apiRoutes);  // Register /services and other API routes here
app.use('/test', testEmailRoute); // Test email route

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Fiverr Clone!');
});

// Verify database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if database connection fails
  });

// Sync models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err: Error) => {
    console.error('Error syncing database:', err);
    process.exit(1); // Exit the process if syncing fails
  });

// Fetch users as a test (ensure it runs after the database sync)
sequelize
  .sync()
  .then(async () => {
    try {
      const users = await User.findAll();
      console.log('Users:', users);
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export app for testing
export default app;
