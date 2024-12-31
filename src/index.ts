import 'reflect-metadata'; // Required for decorators, if you're using TypeORM or similar libraries
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import userRoutes from './routes/user';
import profileRoutes from './routes/profile';
import { authenticateToken } from './middlewares/authenticateToken';
import { sequelize } from './config/database'; // Correct import for sequelize

dotenv.config(); // Ensure dotenv is loaded to access .env variables

const app: Application = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // For parsing JSON payloads

// Routes setup
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);

// Login route
app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Simulate authentication logic (replace with real logic)
  if (email === 'test@example.com' && password === 'password123') {
    const token = jwt.sign(
      { id: 'user123', email },
      process.env.JWT_SECRET || 'your-secret-key', // Use a fallback for JWT_SECRET
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Health check route (optional)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Database connection and server startup
const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    return sequelize.sync({ alter: true }); // Sync schema changes
  })
  .then(() => {
    console.log('Database schema synced successfully!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database or syncing schema:', error);
    process.exit(1); // Ensure the app stops if the DB connection fails
  });

export default app;
