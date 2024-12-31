// src/routes/api.ts

import express, { Request, Response } from 'express';

const router = express.Router();

// Define the root route
router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Fiverr backend is running');
});

export default router;
