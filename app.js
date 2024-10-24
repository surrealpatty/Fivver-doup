const express = require('express');
const dotenv = require('dotenv'); // For managing environment variables
const apiRouter = require('./routes/api'); // Import the combined API routes

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Define the port

// Middleware
app.use(express.json()); // Parse JSON requests

// Use the combined routes
app.use('/api', apiRouter); // Mount the API routes at /api

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack); // Log the error stack trace
    res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Change for clarity
});
