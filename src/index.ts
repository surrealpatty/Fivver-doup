import express from 'express';
import { sequelize } from './config/database'; // Ensure the correct path to your Sequelize config
import dotenv from 'dotenv';

// Import route files
import premiumServiceRoute from './routes/premiumService';
import userRoutes from './routes/user';
import serviceRoutes from './routes/service';
import authRouter from './routes/auth'; // Import the auth router

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register the routes
app.use('/api/premium-service', premiumServiceRoute); // Mount premium service routes under '/api/premium-service'
app.use('/api/users', userRoutes); // Mount user routes under '/api/users'
app.use('/api/services', serviceRoutes); // Mount service routes under '/api/services'
app.use('/auth', authRouter); // Mount auth routes under '/auth'

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.status(200).send('Fiverr backend is running');
});

// Port configuration
const PORT = process.env.PORT || 3000;

let server: any; // Declare a variable to hold the server instance

// Synchronize database and start server only if the file is not imported as a module
if (require.main === module) {  // Ensure this is the main module being executed
  sequelize
    .sync({ alter: true }) // Ensure the database schema is updated (optional)
    .then(() => {
      console.log('Database synchronized successfully.');

      // Start the server after the database is synchronized
      server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error synchronizing the database:', error.message);
    });
}

// Export the server and app for testing purposes
export { server, app, sequelize };
