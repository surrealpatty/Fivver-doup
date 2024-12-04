import express from 'express';
import { sequelize } from './config/database'; // Correct path to sequelize instance
import { User } from './models/user'; // Correct path to the User model
import userRouter from './routes/user'; // Correct path to userRouter
import cors from 'cors';

// Create Express app instance
const app = express();

// Set up the server port
const port = process.env.PORT || 3000; // Port is now 3000

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS (if you need it, for handling cross-origin requests)
app.use(cors());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to Fiverr Clone!');
});

// Function to fetch users as a test (or could be moved to routes later)
async function fetchUsers() {
  try {
    const users = await User.findAll(); // Fetch users as a test
    console.log('Users:', users); // Log users to verify
    if (users.length === 0) {
      console.log('No users found.');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Synchronize models with the database
sequelize.sync({ alter: true }) // Using 'alter' instead of 'force' to avoid dropping tables
  .then(() => {
    console.log('Models are synchronized with the database.');
    
    // Call fetchUsers() after models are synced
    fetchUsers();
  })
  .catch((error: Error) => {
    console.error('Error syncing models:', error);
  });

// Use the userRouter for routes starting with /api/users
app.use('/api/users', userRouter); // Register the user routes under /api/users

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export app for use in testing or elsewhere (if necessary)
export { app };  // Optional: Exporting app in case it's needed for tests or elsewhere
