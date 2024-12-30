import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/database';
import { userRoutes } from './routes/user';
import profileRoutes from './routes/profile';
import { authenticateToken } from './middlewares/authenticateToken';
dotenv.config();
const app = express();
// Middleware setup
app.use(cors());
app.use(express.json());
// Routes setup
app.use('/api/users', userRoutes);
// Apply authenticateToken to each route handler that needs it
profileRoutes.get('/profile', authenticateToken, (req, res) => {
    // Access user from req.user here
    const user = req.user; // Now req has the type CustomAuthRequest
    // ... your profile route logic ...
});
profileRoutes.put('/profile', authenticateToken, (req, res) => {
    // Access user from req.user here
    const user = req.user; // Now req has the type CustomAuthRequest
    // ... your profile update logic ...
});
app.use('/api/profile', profileRoutes);
// Database connection and schema synchronization
sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected successfully!');
    return sequelize.sync({ alter: true });
})
    .then(() => {
    console.log('Database schema synced successfully!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database or syncing schema:', error);
});
export default app;
