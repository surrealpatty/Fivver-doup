// src/index.ts
import express from 'express';
import { sequelize } from './config/database'; // Import sequelize if you need to check DB connection
import userRoutes from './routes/user'; // Example import for your routes

const app = express();

// Middleware and routes setup
app.use(express.json());
app.use('/users', userRoutes); // Assuming you have a route file for user routes

// Start the server and export both the app and server
const server = app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    console.log('Server is running on port 3000');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});

export { app, server }; // Export both the app and server
