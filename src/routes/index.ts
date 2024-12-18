import { Router, Request, Response } from 'express';

const router = Router();

// Define your routes here
router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API');
});

// Export the router as the default export
export default router;
