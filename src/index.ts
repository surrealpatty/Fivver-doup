import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'; // Load environment variables
import { sequelize } from '@config/database';
import userRouter from '@routes/user';
// Load environment variables from .env file
dotenv.config();

const app = express(); // Initialize the Express application
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Middleware to parse JSON request bodies
app.use(express.json());

// Register user routes
app.use('/api/users', userRouter);

// Root route for testing server functionality
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to Fiverr Clone!');
});

// Function to test the database connection
const testDatabaseConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error: unknown) {
    console.error('❌ Unable to connect to the database:', error instanceof Error ? error.message : error);
    throw new Error('Database connection failed');
  }
};

// Function to synchronize the database schema
const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: false }); // Use force: true for development, false for production
    console.log('✅ Database synchronized successfully.');
  } catch (error: unknown) {
    console.error('❌ Error synchronizing database:', error instanceof Error ? error.message : error);
    throw new Error('Database synchronization failed');
  }
};

// Function to initialize the database
const initializeDatabase = async (): Promise<void> => {
  try {
    await testDatabaseConnection();
    await syncDatabase();
  } catch (error: unknown) {
    console.error('❌ Error during database initialization:', error instanceof Error ? error.message : error);
    if (process.env.NODE_ENV === 'test') {
      throw new Error('Database initialization failed during testing.');
    } else {
      process.exit(1); // Exit the application if the database fails to initialize
    }
  }
};

// Global error-handling middleware
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('⚠️ Error encountered:', error);
  res.status(500).json({ message: error.message || 'Internal Server Error' });
});

// Initialize the database and start the server
initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('❌ Server failed to start due to database initialization error:', error instanceof Error ? error.message : error);
  });

// Export the app instance for use in testing
export { app };
console.log(sequelize);
console.log(userRouter);