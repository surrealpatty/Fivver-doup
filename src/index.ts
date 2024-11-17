import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // Optional, depending on your setup
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // This will correctly parse the request body as JSON

// Routes
app.use('/users', userRoutes);

// Export the app instance for testing or other purposes
export { app };

// Start the server if this file is executed directly (not in test environment)
if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}
