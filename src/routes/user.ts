// src/routes/user.ts

import express from 'express';

const router = express.Router();

// Your route definitions here, for example:
router.get('/', (req, res) => {
  res.send('User Routes');
});

// Named export of the router
export { router as userRoutes };
