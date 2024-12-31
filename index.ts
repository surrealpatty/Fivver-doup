import 'reflect-metadata';  // Ensure reflect-metadata is imported to enable decorators for Sequelize models
import express from 'express';
import http from 'http';
import { sequelize } from './src/config/database';  // Correct the path to src/config/database
import serverRoutes from './src/routes/server';  // Correct the path to src/routes/server
import * as dotenv from 'dotenv';  // To load environment variables from .env file

dotenv.config();  // Load environment variables from the .env file

const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(express.json());  // To parse incoming JSON requests

// Use the server routes and mount them under '/api'
app.use('/api', serverRoutes);

// Sync database and start the server if not in the test environment
sequelize.sync({ alter: true }).then(() => {
  // Only start the server if we are not in the 'test' environment
  if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});

// Export both app and server for use in tests and other files
export { app, server };
