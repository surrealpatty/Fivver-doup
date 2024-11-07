import express from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    upgradeToPaid,        // Import the subscription upgrade function
    checkSubscriptionStatus // Import the subscription status check function
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to get the user profile (requires authentication)
router.get('/profile', authMiddleware, getUserProfile);

// Route to update the user profile (requires authentication)
router.put('/profile', authMiddleware, updateUserProfile);

// Route to upgrade to a "Paid" subscription (requires authentication)
router.post('/subscription/upgrade', authMiddleware, upgradeToPaid);

// Route to check the subscription status (requires authentication)
router.get('/subscription/status', authMiddleware, checkSubscriptionStatus);

// Optional: Health check route to confirm if the route is active
router.get('/health', (req, res) => {
    res.json({ message: 'User routes are active!' });
});

export default router;
