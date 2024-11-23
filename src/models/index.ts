import express, { Request, Response } from 'express';
import reviewsRouter from './routes/reviews';
import userRouter from './user';  // Import the user router
import serviceRouter from './routes/servicesRoute';  // Import the services router

// Create an instance of the router
const router = express.Router();

// Define routes
router.use('/api/reviews', reviewsRouter);  // Use reviews router for /api/reviews endpoint
router.use('/api/users', userRouter);  // Use user router for /api/users endpoint
router.use('/api/services', serviceRouter);  // Use services router for /api/services endpoint

// Optional: Health check route
router.get('/health', (_req: Request, res: Response) => {
  res.json({ message: 'API is running' });
});

// Export the router
export default router;
