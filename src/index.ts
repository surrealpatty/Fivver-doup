import express, { Request, Response } from 'express'; // Import express and types for Request and Response
import reviewsRouter from './routes/reviews'; // Import the reviews router (no need for .ts extension)
import userRouter from './routes/user'; // Import the user router from the routes folder
import serviceRouter from './routes/servicesRoute'; // Import the services router (no need for .ts extension)
import cors from 'cors'; // Import CORS (for cross-origin requests)
import dotenv from 'dotenv'; // Import dotenv for environment variable management
import  sequelize  from './config/database'; // Import sequelize instance for graceful shutdown
import http from 'http'; // For graceful shutdown of HTTP server

dotenv.config(); // Load environment variables from a .env file

const app = express(); // Create an instance of the express app

// Middleware to parse JSON bodies
app.use(express.json());

// Optional: CORS middleware to allow cross-origin requests
app.use(cors());

// Mount routers to their respective API endpoints
app.use('/api/reviews', reviewsRouter); // Reviews routes
app.use('/api/users', userRouter); // User routes
app.use('/api/services', serviceRouter); // Services routes

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
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Validate port once at the top
if (!process.env.PORT) {
  console.error('PORT environment variable is not defined.');
  process.exit(1); // Exit if port is not defined
}

// Start the server and handle asynchronous errors
const startServer = async () => {
  try {
    // Create HTTP server using Express app
    const server = http.createServer(app);

    // Start listening on the specified port
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Graceful shutdown handling
    process.on('SIGINT', async () => {
      console.log('Received SIGINT. Closing HTTP server...');
      await server.close(); // Close HTTP server
      await sequelize.close(); // Close database connection
      console.log('Server and database connection closed.');
      process.exit(0); // Exit process successfully
    });

    process.on('SIGTERM', async () => {
      console.log('Received SIGTERM. Closing HTTP server...');
      await server.close(); // Close HTTP server
      await sequelize.close(); // Close database connection
      console.log('Server and database connection closed.');
      process.exit(0); // Exit process successfully
    });

  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit process with failure code if there is an error
  }
};

// Start the server
startServer();
