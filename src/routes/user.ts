import express, { Request, Response } from 'express';
import { registerUser } from '../controllers/userController';  // Correctly import the registerUser function
import { authenticateToken } from '../middlewares/authenticateToken';  // Optional: If you want to protect certain routes

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);  // Register user route

// Other user-related routes (login, etc.) can be added here

export default router;
