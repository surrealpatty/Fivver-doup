import express from 'express';
import { sequelize } from './config/database'; // Example of your Sequelize import

const app = express();

// Create the server after app initialization
const server = app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Export app and server as named exports
export { app, server }; // Corrected order of exports
