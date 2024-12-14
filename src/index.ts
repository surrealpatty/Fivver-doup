import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import passwordResetRoutes from './routes/passwordReset'; // Import password reset routes
import { sequelize } from './config/database';

dotenv.config();

const app: Application = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Route setup
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/auth', authRoutes); // Authentication-related routes
app.use('/api/password-reset', passwordResetRoutes);  // Correctly register password reset routes under /api/password-reset

const startServer = async (): Promise<void> => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    // Sync the database schema (alter the tables if needed)
    await sequelize.sync({ alter: true });
    console.log('Database schema synced successfully!');

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1);
  }
};

startServer();

export default app;
