import express, { Request, Response } from 'express';  // Import express and the types for request and response
import reviewsRouter from './reviews';  // Import the reviews router
import userRouter from './user';  // Import the user router
import serviceRouter from './servicesRoute';  // Import the services router

// Create an instance of the router
const router = express.Router();

// Define routes
router.use('/api/reviews', reviewsRouter);  // Use reviews router for /api/reviews endpoint
router.use('/api/users', userRouter);  // Use user router for /api/users endpoint
router.use('/api/services', serviceRouter);  // Use services router for /api/services endpoint

// Optional: Health check route
router.get('/health', (req: Request, res: Response) => {
  res.json({ message: 'API is running' });
});

// Export the router
export default router;
