import express from 'express';
import { sequelize } from './config/sequelize';
import premiumServiceRoute from './routes/premiumService'; // Ensure the correct path
import userRoutes from './routes/user'; // Ensure the correct path
import serviceRoutes from './routes/service'; // Ensure the correct path

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register the premium service route
app.use('/premium-service', premiumServiceRoute);

// Register other routes
app.use('/api/users', userRoutes); // Mount user routes
app.use('/api/services', serviceRoutes); // Mount service routes

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.status(200).send('Fiverr backend is running');
});

// Start the server on port 3000 (or from environment variables)
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Export the app for use in other files (like tests)
export default app;  // For testing purposes

// Export the server for use in globalTeardown or other test-related purposes
export { server };

// Optionally, you can export sequelize to be used in tests or elsewhere
export { sequelize };
