import express from 'express';
import { sequelize } from './config/database'; // Fixed path for sequelize (assuming it's in src/config/database.ts)
import { User } from './models/user';  // Fixed path for User model (assuming it's in src/models/user.ts)
import userRouter from './routes/user'; // Fixed path for userRouter (assuming it's in src/routes/user.ts)

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

// Use the userRouter for routes starting with /users
app.use('/users', userRouter);  // Adjusted route to match the use of userRouter

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app for use in testing or elsewhere
export { app };
