const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users'); // Existing user routes
const profileRouter = require('./routes/profile'); // Adjust the path accordingly

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON requests

// Use the routes
app.use('/api/users', usersRouter);
app.use('/api', profileRouter); // Integrate the profile routes

// Other middleware and routes...
