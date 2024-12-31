import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import userRoutes from './routes/user';
import profileRoutes from './routes/profile';
import { sequelize } from './config/database';

dotenv.config();  // Load environment variables

const app: Application = express();

// Middleware and routes setup
app.use(cors());
app.use(express.json());  // For JSON payload parsing

// Routes
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Database connection and server startup
const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    return sequelize.sync({ alter: true });  // Sync DB schema
  })
  .then(() => {
    console.log('Database schema synced successfully!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1);  // Exit if DB connection fails
  });

// Export app for testing and graceful shutdown
export default app;
