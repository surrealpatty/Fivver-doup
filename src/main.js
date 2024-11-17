import express from 'express';
import userRoutes from './routes/user';  // Adjust the path as needed

const app = express();

app.use(express.json());  // Body parser middleware
app.use('/api/users', userRoutes);  // Use the user routes

export default app;
