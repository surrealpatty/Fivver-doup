import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user'; // Corrected import for user routes
import servicesRouter from './routes/service'; // Corrected import for services routes
import authenticateToken from './middlewares/authenticateToken'; // Authentication middleware
import { sequelize } from './config/database'; // Import the sequelize instance

dotenv.config(); // Load environment variables from .env file

const app: Application = express(); // Explicitly type the app as Application

// Middleware setup
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies in incoming requests

// Route setup
app.use('/api/users', userRoutes); // Register user routes under /api/users
app.use('/api/services', servicesRouter); // Register services routes under /api/services

// Test the database connection and sync the schema
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    
    // Sync models with the database schema
    return sequelize.sync({ alter: true }); // Adjust 'alter' or 'force' based on environment
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

// Optional: Example route for health check or debugging
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Fivver Doup API!' });
});

// Optional: Global error handler (to catch unhandled errors)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app; // Export the app for testing or other purposes
