import express from 'express';  // Import express
import reviewsRouter from './reviews';  // Import the reviews router (no need for .js extension)
import userRouter from './user';  // Import the user router (no need for .js extension)
import serviceRouter from './servicesRoute';  // Import the services router (no need for .js extension)

// Create an instance of the router
const router = express.Router();

// Define routes
router.use('/api/reviews', reviewsRouter);  // Use reviews router for /api/reviews endpoint
router.use('/api/users', userRouter);  // Use user router for /api/users endpoint
router.use('/api/services', serviceRouter);  // Use services router for /api/services endpoint

// Optional: Health check route
router.get('/health', (req, res) => {
  res.json({ message: 'API is running' });
});

// Export the router
export default router;
