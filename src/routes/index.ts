import express, { Request, Response } from 'express';  // Import express and the types for request and response
import reviewRouter from './review';  // Correct import path for Review.ts (router in Review.ts)
import userRouter from './user';  // Ensure userRouter is properly defined and exported as a router
import serviceRouter from './service';  // Correct import path for service.ts (router in service.ts)

// Create an instance of the router
const router = express.Router();

// Define routes
router.use('/api/reviews', reviewRouter);  // Use reviewRouter for /api/reviews endpoint
router.use('/api/users', userRouter);  // Use userRouter for /api/users endpoint
router.use('/api/services', serviceRouter);  // Use serviceRouter for /api/services endpoint

// Optional: Health check route
router.get('/health', (_req: Request, res: Response): void => {
  res.json({ message: 'API is running' });
});

// Export the router
export default router;
