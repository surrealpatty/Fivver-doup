import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './routes/user';  // Import userRoutes correctly
import authRoutes from './routes/auth';
import passwordResetRoutes from './routes/passwordReset';  // Import password reset routes
import { sequelize } from './config/database';

dotenv.config();

const app: Application = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Route setup
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);  // Register password reset routes

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
    await sequelize.sync({ alter: true });
    console.log('Database schema synced successfully!');

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
