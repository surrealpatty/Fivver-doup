import express from 'express';
import { sequelize } from './config/sequelize';  // Ensure the correct path to sequelize config
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

// Port configuration
const PORT = process.env.PORT || 3000;

let server: any;  // Declare a variable to hold the server instance

// Start the server only if the file is not imported as a module
if (!module.parent) {
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the server instance and sequelize for testing purposes
export { server, sequelize };

// Default export for app to be used in tests and other files
export default app;
