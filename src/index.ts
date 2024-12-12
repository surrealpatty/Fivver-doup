import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user'; // Import user routes
import { sequelize } from './config/database'; // Import sequelize for database connection

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies in requests

// Routes setup
app.use('/api/user', userRoutes); // Use the user routes for paths starting with /api/user

// Test the database connection and sync the schema
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');

    // Sync models with the database schema
    return sequelize.sync({ alter: true }); // Use { force: true } cautiously in development
  })
  .then(() => {
    console.log('Database schema synced successfully!');
    
    // Start the server after syncing the database schema
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to the database or syncing schema:', error);
  });

export default app; // Export the app for testing or other use
