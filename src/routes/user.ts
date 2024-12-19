import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController'; // Assuming you have these controller functions

const router = Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Add more routes as needed
// For example, route for getting user details, updating profile, etc.

export const userRoutes = router; // Export userRoutes so it can be used elsewhere
