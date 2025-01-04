// src/index.ts
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
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Export the app for use in other files (like tests)
export default app;

// If you need to export the sequelize instance for testing or other purposes
export { app, sequelize };
