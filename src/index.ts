// src/index.ts

import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';  // Import jsonwebtoken for JWT signing
import { sequelize } from './config/database';  // Ensure sequelize is imported correctly
import userRoutes from './routes/user';
import profileRoutes from './routes/profile';
import { authenticateToken } from './middlewares/authenticateToken';

dotenv.config();

const app: Application = express();

// Middleware setup
app.use(cors());
app.use(express.json());  // For parsing application/json

// Routes setup
app.use('/api/users', userRoutes);

// Define the login route
app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Simulate authentication logic (replace with real authentication)
  if (email === 'test@example.com' && password === 'password123') {
    const token = jwt.sign(
      { id: 'user123', email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Apply authenticateToken to each route handler that needs it
profileRoutes.get('/profile', authenticateToken, (req, res) => {
  const user = req.user;  // Now req has the type CustomAuthRequest
  res.json({ user });
});

profileRoutes.put('/profile', authenticateToken, (req, res) => {
  const user = req.user;  // Now req has the type CustomAuthRequest
  // Profile update logic here
  res.status(200).json({ message: 'Profile updated' });
});

app.use('/api/profile', profileRoutes);

// Database connection and schema synchronization
sequelize
  .authenticate()  // Make sure authenticate() method is called on the sequelize instance
  .then(() => {
    console.log('Database connected successfully!');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database schema synced successfully!');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database or syncing schema:', error);
  });

export default app;
