import express from 'express'; // Import express
import reviewsRouter from './reviews.js'; // Import the reviews router
import userRouter from './user.js'; // Import the user router
import serviceRouter from './servicesRoute.js'; // Import the services router

// Create an instance of the router
const router = express.Router();

// Mount routers
router.use('/api/reviews', reviewsRouter); // Reviews routes
router.use('/api/users', userRouter); // User routes
router.use('/api/services', serviceRouter); // Services routes

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Handle undefined routes
router.all('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    error: 'NotFoundError',
  });
});

// Export the router
export default router;
