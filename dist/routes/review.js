import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct path for authenticateToken middleware
const router = Router();
// POST route to create a new review
router.post('/', authenticateToken, async (req, res, next) => {
    try {
        const user = req.user; // Type casting to CustomAuthRequest
        if (!user || !user.tier) {
            return res.status(400).json({ message: 'User tier is missing or user is not authenticated.' });
        }
        const email = user.email ?? 'No email provided'; // Use nullish coalescing for fallback
        const { rating, comment, serviceId } = req.body;
        if (!rating || !comment || !serviceId) {
            return res.status(400).json({ message: 'Rating, comment, and serviceId are required' });
        }
        // Logic to create a review (e.g., saving it in the database)
        // Example: await Review.create({ userId: user.id, review: comment, serviceId: serviceId });
        return res.status(201).json({ message: 'Review created successfully.', userEmail: email });
    }
    catch (err) {
        next(err); // Pass errors to the error handler
        return res.status(500).json({ message: 'Server error' });
    }
});
// GET route to fetch reviews for a specific service
router.get('/:serviceId', authenticateToken, async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        const serviceId = req.params.serviceId;
        // Logic to fetch reviews for the service (e.g., querying the database)
        // Example: const reviews = await Review.findAll({ where: { serviceId: serviceId } });
        return res.status(200).json({ message: `Reviews for service ${serviceId} fetched successfully.` });
    }
    catch (err) {
        next(err); // Pass errors to the error handler
        return res.status(500).json({ message: 'Server error' });
    }
});
export default router;
