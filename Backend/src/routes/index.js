import express from 'express';  // Import express
import cors from 'cors';        // Import cors for Cross-Origin Resource Sharing
import bodyParser from 'body-parser'; // Import body-parser to parse incoming request bodies
import reviewsRouter from './src/routes/reviews.js'; // Import the reviews router

// Create an instance of the express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
app.use('/api/reviews', reviewsRouter); // Use reviews router for /api/reviews endpoint

// Optional: Health check route
app.get('/health', (req, res) => {
    res.json({ message: 'API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack
    res.status(500).json({ message: 'Something went wrong!' }); // Generic error response
});

// Start the server
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
