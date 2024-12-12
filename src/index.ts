import express from 'express';
import dotenv from 'dotenv';
import router from './routes';  // Import your router
import cors from 'cors';
import { sequelize } from './config/database';  // Import sequelize configuration

dotenv.config();  // Load environment variables

const app = express();

// Middleware setup
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON bodies

// Use the router for API routes
app.use('/api', router);

// Test DB connection and start the server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    
    // Use the PORT environment variable or default to 4000
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to the database:', error);
  });

export default app;
