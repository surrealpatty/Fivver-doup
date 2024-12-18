import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './config/database';
import retry from 'retry-as-promised'; // Import retry-as-promised
import { userRoutes } from './routes/user'; // Named import
import protectedRoutes from './routes/protectedRoute';
import serviceRoutes from './routes/service';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', protectedRoutes);
app.use('/api/services', serviceRoutes);

/**
 * Function to sync the database with retry logic
 */
const syncDatabase = async (): Promise<void> => {
  try {
    console.log('Connecting to the database...');
    // Retry authentication up to 3 times, with a timeout of 5 seconds
    await retry(() => sequelize.authenticate(), { max: 3, timeout: 5000 });
    console.log('Database connected successfully!');

    console.log('Syncing database schema...');
    // Retry syncing up to 3 times, with a timeout of 5 seconds
    await retry(() => sequelize.sync({ force: true }), { max: 3, timeout: 5000 });
    console.log('Database schema synced successfully!');
  } catch (error) {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1);
  }
};

/**
 * Function to start the server after syncing the database
 */
const startServer = async (): Promise<void> => {
  await syncDatabase(); // Ensure the database is synced before starting the server

  const PORT = process.env.PORT || 5000; // Default to 5000 if no port is specified or if port 3000 is in use
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

// Start the server
startServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});

export default app;
