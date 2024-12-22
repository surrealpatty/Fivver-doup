// src/routes/user.ts
import { Router } from 'express';

const userRoutes = Router();

// Define your user routes here, e.g.
userRoutes.get('/', (req, res) => {
  res.send('User routes');
});

export { userRoutes }; // Make sure it's named export
