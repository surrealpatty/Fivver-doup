import 'reflect-metadata'; // Required for Sequelize decorators
import express from 'express';
import http from 'http';
import { Sequelize } from 'sequelize-typescript'; // Sequelize ORM with TypeScript support
import User from './models/user'; // Path to the User model
import { Service } from './models/services'; // Path to the Service model
import userRoutes from './routes/user'; // User-related routes
import serviceRoutes from './routes/service'; // Service-related routes
// Initialize Sequelize instance with database connection
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    models: [User, Service], // Load models
});
// Initialize Express application
const app = express();
const server = http.createServer(app);
// Middleware to parse incoming JSON requests
app.use(express.json());
// Root route to confirm server is running
app.get('/', (req, res) => {
    res.status(200).send('Fiverr backend is running');
});
// Additional endpoint for testing or specific functionality
app.get('/some-route', (req, res) => {
    res.status(200).send('This is the some-route endpoint');
});
// Mount user routes at /api/users
app.use('/api/users', userRoutes);
// Mount service routes at /api
app.use('/api', serviceRoutes);
// Sync the database and start the server if not in a test environment
sequelize.sync().then(() => {
    if (process.env.NODE_ENV !== 'test') {
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
});
// Export the app and server for testing or further integration
export { app, server };
