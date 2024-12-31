import express from 'express';
import http from 'http';
import { sequelize } from './config/database'; // Ensure the sequelize instance is imported

const app = express();

// Setup your app (middleware, routes, etc.)
app.get('/', (req, res) => res.send('Hello World!'));

// Create the HTTP server to use with Express
const server = http.createServer(app);

// Sync sequelize with the database (optional, depending on your setup)
sequelize.sync().then(() => {
  // Start the server only if not in a test environment
  if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});

// Export the app and server for use in tests
export { app, server };  // Export both app and server for testing purposes
