import { Router, Request, Response } from 'express';

const router = Router();

// Example route: /some-route
router.get('/some-route', (req: Request, res: Response): Response => {
  return res.status(200).send('Success');
});

// Export the router to be used in app.js or index.js
export default router;
