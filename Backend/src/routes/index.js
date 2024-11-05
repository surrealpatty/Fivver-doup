import express from 'express';  // Import express
import reviewsRouter from './reviews.js'; // Import the reviews router
import userRouter from './user.js'; // Import the user router (if applicable)
import serviceRouter from './servicesRoute.js'; // Import the services router (if applicable)

// Create an instance of the router
const router = express.Router();

// Define routes
router.use('/api/reviews', reviewsRouter); // Use reviews router for /api/reviews endpoint
router.use('/api/users', userRouter); // Use user router for /api/users endpoint
router.use('/api/services', serviceRouter); // Use services router for /api/services endpoint

// Optional: Health check route
router.get('/health', (req, res) => {
    res.json({ message: 'API is running' });
});

// Export the router
export default router;
