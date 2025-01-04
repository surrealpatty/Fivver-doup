import express from 'express';
import { CustomAuthRequest } from './types'; // Correct the import for CustomAuthRequest if needed
import premiumServiceRoute from './routes/premiumService'; // Ensure the correct path to premium service route
import userRoutes from './routes/user'; // Path to user routes
import serviceRoutes from './routes/service'; // Path to service routes

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

export default app; // Export app for testing or further integration
