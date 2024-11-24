import express, { Request, Response } from 'express';  // Import express and the types for request and response
import reviewsRouter from './reviewRoutes';  // Ensure reviewRoutes exists in the same directory
import userRouter from './user';  // Ensure userRouter is properly defined and exported
import serviceRouter from './serviceRoutes';  // Ensure serviceRoutes exists in the same directory

// Create an instance of the router
const router = express.Router();

// Define routes
router.use('/api/reviews', reviewsRouter);  // Use reviews router for /api/reviews endpoint
router.use('/api/users', userRouter);  // Use user router for /api/users endpoint
router.use('/api/services', serviceRouter);  // Use services router for /api/services endpoint

// Optional: Health check route
router.get('/health', (_req: Request, res: Response) => {  // Use underscore for unused req
  res.json({ message: 'API is running' });
});

// Export the router
export default router;
