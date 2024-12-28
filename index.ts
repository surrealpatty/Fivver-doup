import dotenv from 'dotenv'; // Load environment variables
import express from 'express'; // Express framework
import sequelize from '@config/database'; // Import Sequelize database configuration
import userRouter from '@routes/user'; // Import user routes

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Set up routes
app.use('/users', userRouter);

// Test database connection
sequelize.authenticate().then(() => {
  console.log('Database connection established.');
}).catch((err) => {
  console.error('Failed to connect to the database:', err);
  process.exit(1);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export the app for testing or other purposes
export { app };
