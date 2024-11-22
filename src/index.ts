import express, { Request, Response } from 'express'; // Import express and types for Request and Response
import reviewsRouter from './routes/reviews'; // Import the reviews router from the routes folder
import userRouter from './routes/user'; // Import the user router from the routes folder
import serviceRouter from './routes/servicesRoute'; // Import the services router from the routes folder

const app = express(); // Create an instance of the express app

// Middleware to parse JSON bodies
app.use(express.json());

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
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for use in server setup (e.g., testing or deployment)
export default app;
