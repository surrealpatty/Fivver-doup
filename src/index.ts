import express from 'express';
import cors from 'cors';
import { registerUser } from './controllers/authController'; // Correct path to your controller
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // This will correctly parse the request body as JSON

// Register route with async handler
app.post('/register', async (req, res) => {
    try {
        await registerUser(req, res); // Directly call async function here
    } catch (error) {
        console.error('Error handling register route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Use other routes (e.g., for user profile)
app.use('/users', userRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
