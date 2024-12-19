// src/index.ts
import express from 'express';
import userRoutes from './routes/user';  // Import user routes
import serviceRoutes from './routes/service';  // Import service routes
import bodyParser from 'body-parser'; // Import body-parser to handle JSON bodies

const app = express();

// Middleware setup (e.g., body-parser for JSON requests)
app.use(bodyParser.json());

// Setup routes
app.use('/users', userRoutes);  // Users route
app.use('/services', serviceRoutes);  // Services route

// Add other necessary middleware, error handling, etc.

// Export the app as a default export
export default app;
