const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users'); // Existing user routes
const profileRouter = require('./routes/profile'); // Adjust the path accordingly

const app = express();
const PORT = process.env.PORT || 3000; // Define the port

// Middleware
app.use(bodyParser.json()); // Parse JSON requests

// Use the routes
app.use('/api/users', usersRouter);
app.use('/api', profileRouter); // Integrate the profile routes

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send('Something broke!'); // Send a generic error response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
