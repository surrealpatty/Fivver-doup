import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/database'; // Import sequelize instance
import { userRoutes } from './routes/user'; // Import user routes
import authRoutes from './routes/auth';
import passwordResetRoutes from './routes/passwordReset'; // Import password reset routes
import { User } from './models/user'; // Import User model

dotenv.config();

const app: Application = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Route setup
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes); // Register password reset routes

// Function to sync the database
const syncDatabase = async (): Promise<void> => {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    // Sync the schema (alter: true to update existing tables without deleting them)
    await sequelize.sync({ alter: true }); // Use `alter: true` instead of `force: true` to safely update schema
    console.log('Database schema synced successfully!');
  } catch (error) {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1); // Exit the process if the DB connection or sync fails
  }
};

// Temporary test function to create a user
const testCreateUser = async (): Promise<void> => {
  try {
    const newUser = await User.create({
      username: 'testuser', // Adjust test data as needed
      email: 'testuser@example.com',
      password: 'testpassword',
      role: 'user', // Add missing properties (set appropriate values)
      tier: 1, // Assuming tier is a number, adjust as needed
      isVerified: false, // Assuming isVerified is a boolean
    });
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Start the server after syncing
const startServer = async (): Promise<void> => {
  await syncDatabase(); // Sync database before starting the server

  // Run test function only in a development environment
  if (process.env.NODE_ENV === 'development') {
    await testCreateUser();
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();

export default app;
