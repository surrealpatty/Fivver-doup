// src/index.ts

import express from 'express'; // Import Express
import dotenv from 'dotenv'; // Load environment variables
import cors from 'cors'; // Enable CORS
import bodyParser from 'body-parser'; // Parse request bodies

// Import your routes (adjust the paths based on your project structure)
import userRoutes from './routes/user';
import serviceRoutes from './routes/service';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express(); // Create the app instance

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define your routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/services', serviceRoutes); // Service-related routes

// Default route for health check
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Start the server if not in a test environment
const server = app.listen(process.env.PORT || 3000, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
  }
});

export { server };  // Export the server object to be used in tests
