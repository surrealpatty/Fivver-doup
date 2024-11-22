import express, { Request, Response } from 'express';  // Import express and types for Request and Response
import reviewsRouter from './routes/reviews';  // Import the reviews router from the routes folder
import userRouter from './routes/user';  // Import the user router from the routes folder
import serviceRouter from './routes/servicesRoute';  // Import the services router from the routes folder
import cors from 'cors';  // Import CORS (for cross-origin requests)
import dotenv from 'dotenv';  // Import dotenv for environment variable management

dotenv.config();  // Load environment variables from a .env file

const app = express();  // Create an instance of the express app

// Middleware to parse JSON bodies
app.use(express.json());

// Optional: CORS middleware to allow cross-origin requests
app.use(cors());

// Mount routers to their respective API endpoints
app.use('/api/reviews', reviewsRouter);  // Reviews routes
app.use('/api/users', userRouter);  // User routes
app.use('/api/services', serviceRouter);  // Services routes

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running' });
});

// Handle undefined routes
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Route not found',
    error: 'NotFoundError',
  });
});

// Set the port number (use an environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// Start the server and handle asynchronous errors
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);  // Exit process with failure code
  }
};

startServer();

// Graceful shutdown: ensure the server closes properly
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server...');
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing server...');
  process.exit();
});

// Export the app for use in server setup (e.g., testing or deployment)
export default app;
