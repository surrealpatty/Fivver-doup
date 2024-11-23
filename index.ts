import express from 'express';
import { sequelize } from './models/database';  // Adjust path if necessary
import { User } from './models/user';  // Explicit import for User model
import userRouter from './routes/user'; // Adjust path for userRouter

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // Middleware to parse JSON bodies

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

// Example of using the User model
User.findAll()  // Fetch users (as a test)
  .then(users => {
    console.log('Users:', users);
  })
  .catch((error: Error) => {
    console.error('Error fetching users:', error);
  });

// Use the userRouter for routes starting with /user
app.use('/user', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };  // Export app for use in testing or elsewhere
