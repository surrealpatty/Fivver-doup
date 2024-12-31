import { Router, Request, Response } from 'express';

const router = Router();

// Example route
router.get('/some-route', (req: Request, res: Response) => {
  res.status(200).send('Success');
});

// Export the router
export default router;
