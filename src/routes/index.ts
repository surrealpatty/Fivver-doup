import express, { Request, Response } from 'express';  // Import express and types for request and response
import reviewRouter from './review';  // Ensure reviewRouter is correctly exported from review.ts
import userRouter from './user';  // Correctly imported userRouter from user.ts
import serviceRouter from './service';  // Ensure serviceRouter is correctly exported from service.ts

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
