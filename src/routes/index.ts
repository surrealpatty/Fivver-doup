import express from 'express';
import dotenv from 'dotenv';
import { Router } from 'express';
import cors from 'cors';
import { sequelize } from './config/database';  // Import the sequelize instance for DB connection

dotenv.config();  // Load environment variables

const app = express();

// Middleware setup
app.use(cors());  // CORS middleware to handle cross-origin requests
app.use(express.json());  // To parse incoming JSON payloads

// Use the router for the app
app.use('/api', router);  // Prefix the routes with "/api"

// Test DB connection and start server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
aimport { Router } from 'express';
import passwordResetRoutes from './passwordReset';  // Import the password reset routes (if applicable)

const router = Router();

// Include the password reset routes or other routes here
router.use('/password-reset', passwordResetRoutes);  // Add password reset routes to the main router

// Other routes, like profile, services, etc.
import profileRoutes from './profile';  // Import other route files

router.use('/profile', profileRoutes);  // Add profile routes

// More route imports can go here, and ensure they are added to the main router

export default router;
