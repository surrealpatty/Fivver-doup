import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import serviceRoutes from './routes/service';

dotenv.config();  // Load environment variables from .env file

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes setup
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/auth', authRoutes);

// Default route for testing the API
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

const PORT = process.env.PORT || 3000;

// Create and start the server, but only if not in test mode
let server: any;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else {
  console.log('Running in test mode.');
}

// Export the server for global teardown
export { server };

// Export the app as a default export (useful for testing or reusability)
export default app;
