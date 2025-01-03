import 'reflect-metadata'; // Ensure decorators work with Sequelize models
import express from 'express';
import http from 'http';
import sequelize from './config/database'; // Correct import for the Sequelize instance
import userRoutes from './routes/user'; // Correct path for user routes
// Initialize Express application
const app = express();
const server = http.createServer(app);
// Middleware to parse JSON
app.use(express.json());
// Root endpoint to avoid 404 errors in tests
app.get('/', (req, res) => {
    res.status(200).send('Fiverr backend is running'); // Respond with a 200 OK and message
});
// Mount user routes under '/api/users'
app.use('/api/users', userRoutes);
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
//# sourceMappingURL=index.js.map