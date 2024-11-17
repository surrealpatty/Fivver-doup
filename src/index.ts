import express from 'express';  // Import Express
import { sequelize } from './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware and routes setup
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Sync sequelize models (syncing the database)
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error: Error) => {  // Typing the error as `Error` for better type safety
    console.error('Error syncing database:', error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the app instance for testing
export { app };
