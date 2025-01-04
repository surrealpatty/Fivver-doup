import express from 'express';
import dotenv from 'dotenv'; // Import dotenv to load environment variables

// Load environment variables from the .env file
dotenv.config();

import { sequelize } from './config/sequelize'; // Ensure the correct path
import premiumServiceRoute from './routes/premiumService'; // Ensure the correct path
import userRoutes from './routes/user'; // Ensure the correct path
import serviceRoutes from './routes/service'; // Ensure the correct path

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register the premium service route
app.use('/api/premium-service', premiumServiceRoute); // Mount the route under '/api/premium-service'

// Register other routes
app.use('/api/users', userRoutes); // Mount user routes under '/api/users'
app.use('/api/services', serviceRoutes); // Mount service routes under '/api/services'

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.status(200).send('Fiverr backend is running');
});

// Access JWT secret from the environment variable (for example, logging it to test)
const jwtSecret = process.env.JWT_SECRET_KEY;
console.log('JWT Secret:', jwtSecret); // Just for testing purposes

// Port configuration
const PORT = process.env.PORT || 3000;

// Start the server only if the file is not imported as a module
if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export server and sequelize for test purposes
export { sequelize };

// Default export for app to be used in tests and other files
export default app;
