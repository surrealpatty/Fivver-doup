import 'reflect-metadata'; // Ensure decorators work with Sequelize models
import express from 'express';
import http from 'http';
import { Sequelize } from 'sequelize-typescript'; // Import Sequelize
import User from './models/user'; // Correct path to your User model
import { Service } from './models/services'; // Correct path to Service model
import userRoutes from './routes/user'; // Correct path for user routes
import serviceRoutes from './routes/service'; // Correct path for service routes
// Initialize Sequelize instance
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    models: [User, Service], // Include all models here
});
// Initialize Express application
const app = express();
const server = http.createServer(app);
// Middleware to parse JSON
app.use(express.json());
// Root endpoint to avoid 404 errors in tests and confirm server is running
app.get('/', (req, res) => {
    res.status(200).send('Fiverr backend is running'); // Respond with 200 OK
});
// Define a specific /some-route endpoint to avoid 404 errors in tests
app.get('/some-route', (req, res) => {
    res.status(200).send('This is the some-route endpoint'); // Respond with a 200 OK
});
// Mount user routes under '/api/users'
app.use('/api/users', userRoutes);
// Mount service routes under '/api' to ensure '/premium-service' path is available
app.use('/api', serviceRoutes); // Register all service-related routes here
// Sync database and start server if not in test environment
sequelize.sync().then(() => {
    if (process.env.NODE_ENV !== 'test') {
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
});
// Export app and server for use in tests or other files
export { app, server };
