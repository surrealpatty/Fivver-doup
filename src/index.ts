// src/app.ts (or src/index.ts)
import express from 'express';
import authRoutes from './routes/auth';  // Import the auth routes

const app = express();

app.use(express.json()); // For parsing application/json

app.use('/api/auth', authRoutes); // Register auth routes under /api/auth

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
