import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/database'; // Import sequelize instance
import  userRoutes  from './routes/user'; // Import user routes
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

/**
 * Function to sync the database
 * Sync the schema with `alter: true` to safely update existing tables
 */
const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
    await sequelize.sync({ alter: true }); // Safely update schema
    console.log('Database schema synced successfully!');
  } catch (error) {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1); // Exit the process on failure
  }
};

/**
 * Temporary test function to create a test user
 * Only runs in the development environment
 */
const testCreateUser = async (): Promise<void> => {
  try {
    const newUser = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
      role: 'user',
      tier: 'free', // Use "free" or "paid" as required by the ENUM type
      isVerified: false, // Not verified
    });
    console.log('Test user created:', newUser.toJSON());
  } catch (error) {
    console.error('Error creating test user:', error);
  }
};

/**
 * Function to start the server
 * Sync the database first, then start listening on the specified port
 */
const startServer = async (): Promise<void> => {
  await syncDatabase();

  if (process.env.NODE_ENV === 'development') {
    await testCreateUser(); // Create test user only in development
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

// Start the server
startServer();

export default app;
