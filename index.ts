import express, { Application } from 'express';
import { sequelize } from './src/config/database'; // Correct path to sequelize instance
import { User } from './src/models/user'; // Correct path to the User model
import { userRouter } from './src/routes/user'; // Correctly import userRouter using named import
import cors from 'cors';

// Create Express app instance
const app: Application = express();

// Set up the server port
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to Fiverr Clone!');
});

// Use CORS middleware if needed (to allow cross-origin requests)
app.use(cors());

// Database connection check
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });

// Example of using the User model (this could be moved to a service or controller later)
User.findAll() // Fetch users as a test
  .then((users) => {
    console.log('Users:', users);
  })
  .catch((error: Error) => {
    console.error('Error fetching users:', error);
  });

// Register the userRouter for routes starting with /api/users
app.use('/api/users', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app for use in testing or elsewhere (if necessary)
export { app };  // Optional: Exporting app in case it's needed for tests or elsewhere
