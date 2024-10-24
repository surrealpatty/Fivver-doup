const express = require('express');
const usersRouter = require('./routes/users'); // Existing user routes
const profileRouter = require('./routes/profile'); // Profile routes
const servicesRouter = require('./routes/services'); // New service routes

const app = express();
const PORT = process.env.PORT || 3000; // Define the port

// Middleware
app.use(express.json()); // Parse JSON requests (no need for body-parser)

// Use the routes
app.use('/api/users', usersRouter);
app.use('/api/profile', profileRouter); // Ensure the path is correct
app.use('/api/services', servicesRouter); // Added services routes

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error('Error:', err.stack); // Log the error stack trace
    res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
