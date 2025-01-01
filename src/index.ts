import 'reflect-metadata';  // Ensure decorators work with Sequelize models
import express from 'express';
import http from 'http';
import sequelize from './config/database';  // Correct way to import default export
import serverRoutes from './routes/server';  // Ensure this path is correct

const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(express.json());  // To parse incoming JSON requests

// Root endpoint setup to avoid 404 errors in tests
app.get('/', (req, res) => {
  res.status(200).send('Fiverr backend is running');  // Respond with 200 OK and a message
});

// Use the server routes and mount them under '/api'
app.use('/api', serverRoutes);

// Sync database and start the server if not in test environment
sequelize.sync().then(() => {
  if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});

// Export both app and server for use in tests and other files
export { app, server };
