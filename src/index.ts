import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user'; // Import user router

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount routes
app.use('/api/users', userRouter); // Add user-related routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
