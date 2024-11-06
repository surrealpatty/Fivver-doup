import express from 'express';  // Importing Express
import sequelize from './config/database.js';  // Importing Sequelize instance for database connection
import userRoutes from './src/routes/user.js';  // Import your user routes
import serviceRoutes from './src/routes/service.js';  // Import your service routes (if applicable)
import cors from 'cors';  // Import CORS middleware (optional, but useful for cross-origin requests)
import morgan from 'morgan';  // Importing morgan for logging HTTP requests

const app = express();  // Initialize the Express app
const PORT = process.env.PORT || 3000;  // Use environment variable or default to 3000

// Middleware
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
app.use(cors());  // Enable CORS for all routes (use with caution in production)
app.use(morgan('dev'));  // Log HTTP requests in development mode

// API Routes
app.use('/api/user', userRoutes);  // Route for user API
app.use('/api/service', serviceRoutes);  // Route for service API (if you have it)

// Home route or a fallback route
app.get('/', (req, res) => {
  res.send('Welcome to the Fiverr clone API!');
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}...`);
  try {
    // Sync database models with the database
    await sequelize.sync();
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
});
