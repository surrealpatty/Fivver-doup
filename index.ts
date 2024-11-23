import express from 'express';
import { sequelize } from './config/database'; // Path to the sequelize instance
import { User } from './models/user';  // Path to the User model
import userRouter from './routes/user'; // Path to userRouter

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to Fiverr Clone!');
});

// Database connection check
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });

// Example of using the User model (as a test)
User.findAll()  // Fetch users as a test
  .then(users => {
    console.log('Users:', users);
  })
  .catch((error: Error) => {
    console.error('Error fetching users:', error);
  });

// Use the userRouter for routes starting with /api/users
app.use('/api/users', userRouter);  // Register the user routes under /api/users

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app for use in testing or elsewhere
export { app };
