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
const PORT = process.env.PORT || 3000;
let server: any; // Declare the server variable

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else {
  console.log('Running in test mode. Server initialization is deferred to tests.');
}

// Gracefully shut down the server after tests
if (process.env.NODE_ENV === 'test') {
  afterAll(() => {
    if (server) {
      server.close(() => {
        console.log('Test server closed');
      });
    }
  });
}

// Export the app and server for use in tests and other files
export { app, server };
