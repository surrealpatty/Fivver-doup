// src/index.ts (Make sure app is exported as default)
import express from 'express';
import  someRoute  from './routes';

// Create the Express app
const app = express();

// Define your routes
app.use('/api', someRoute);

// Export app as the default export
export default app;
