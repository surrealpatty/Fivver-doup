import express, { Request, Response, NextFunction } from 'express';
import { testConnection } from './config/database';
import userRouter from './routes/user.js';
import { sequelize } from './config/database'; // Relative path

const app = express();

app.use(express.json()); // Use middleware to parse JSON bodies

// Use userRouter for handling user-related routes under the /api/users endpoint
app.use('/api/users', userRouter); // Correct route registration

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message); // Log the error
  res.status(500).json({ message: 'An internal server error occurred.' });
});

const server = app.listen(3000, async () => {
  try {
    await testConnection(); // Test database connection
    console.log('Server is running on port 3000');
  } catch (error) {
    console.error(
      'Error connecting to the database:',
      error instanceof Error ? error.message : error
    );
  }
});

export { app, server };
