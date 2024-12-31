import express from 'express';
import { json, urlencoded } from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Middleware setup
app.use(json());  // For parsing application/json
app.use(urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded

// Example POST route (login endpoint)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Authentication logic goes here (e.g., validate user credentials)
  const token = 'dummy-jwt-token';  // Replace with actual JWT generation
  
  res.status(200).json({ token });
});

// Add the missing GET route for the test
app.get('/some-route', (req, res) => {
  res.status(200).send('This is a response from /some-route');
});

// Export the app for use in your tests or other modules
export default app;
