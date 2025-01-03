import 'reflect-metadata'; // Ensure decorators work with Sequelize models
import express, { Application, Request, Response } from 'express';
import http from 'http';
import { sequelize } from './config/database';  // Correct import
import userRoutes from './routes/user'; // Correct path for user routes
import serviceRoutes from './routes/service'; // Import the service routes (including the premium-service route)

// Initialize Express application
const app: Application = express();
const server = http.createServer(app);

// Middleware to parse JSON
app.use(express.json());

// Root endpoint to avoid 404 errors in tests
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Fiverr backend is running'); // Respond with a 200 OK and message
});

// Mount user routes under '/api/users'
app.use('/api/users', userRoutes);

// Mount service routes under '/api' to ensure the '/premium-service' path is available
app.use('/api', serviceRoutes); // Register the service routes here

// Sync database and start server if not in test environment
sequelize.sync().then(() => {
  if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});

// Export app and server for use in tests or other files
export { app, server };
