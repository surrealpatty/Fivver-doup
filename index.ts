import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'; // Load environment variables from .env file
import { sequelize } from '@config/database';  // Correct alias for the config
import userRouter from '@routes/user';         // Correct alias for routes
import path from 'path'; // Required to serve static files

dotenv.config(); // Ensure to load environment variables before using them

const app = express(); // Initialize the Express app
const port = process.env.PORT || 3000; // Use environment variable PORT or default to 3000

// Middleware to parse JSON request bodies
app.use(express.json());

// Log the incoming request method and URL for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`); // Log method and URL
  next(); // Pass the request to the next middleware or route handler
});

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// User routes (e.g., /api/users route)
app.use('/api/users', userRouter);

// Example route for the root path
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
    throw new Error('Database connection failed');
  }
};

// Function to synchronize Sequelize models
const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: false }); // force: true for dev, force: false for prod
    console.log('Database synchronized successfully');
  } catch (error: unknown) {
    console.error('Error synchronizing database:', error instanceof Error ? error.message : error);
    throw new Error('Database synchronization failed');
  }
};

// Function to initialize the database connection and sync models
const initializeDatabase = async (): Promise<void> => {
  try {
    await testDatabaseConnection(); // Ensure the database connection is established
    await syncDatabase(); // Sync the models once connected
  } catch (error: unknown) {
    console.error('Error initializing the database:', error instanceof Error ? error.message : error);

    if (process.env.NODE_ENV === 'test') {
      throw new Error('Database initialization failed during testing.');
    } else {
      process.exit(1); // Exit if the database connection or sync fails
    }
  }
};

// Global error-handling middleware
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', error); // Log the error for debugging
  res.status(500).json({ message: error.message || 'Internal Server Error' });
});

// Initialize the database and start the server if successful
initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Server failed to start due to database error:', error instanceof Error ? error.message : error);
  });

// Export the app instance for use in tests or elsewhere
export { app };
console.log(sequelize);
console.log(userRouter);
