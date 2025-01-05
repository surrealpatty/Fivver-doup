// src/index.ts
import express from 'express';
import serviceRoutes from './routes/serviceRoutes';  // Correct path to your service routes

const app = express();

// Middleware setup, like body parsers, error handlers, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register the routes for the service API
app.use('/api', serviceRoutes);  // All service-related routes will be prefixed with /api

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
