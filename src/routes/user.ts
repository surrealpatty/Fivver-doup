// src/routes/user.ts
import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// Define your routes
router.get('/', (req: Request, res: Response) => {
  res.send('User routes');
});

// Export the router for use in the app
export { router as userRoutes };
