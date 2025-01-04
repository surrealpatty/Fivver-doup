import { Router, Request, Response } from 'express';
import authenticateToken from '../middlewares/authenticateToken'; // Ensure the correct path to the middleware
import { UserPayload } from '../types'; // Ensure the correct path to the type

const router = Router();

// Define the premium service route with authentication
router.get('/premium-service', authenticateToken, (req: Request & { user?: UserPayload }, res: Response) => {
    // Check if the user object exists and the user has a 'paid' tier
    if (req.user?.tier === 'paid') {
        res.status(200).json({ message: 'Premium service access granted.' });
    } else if (req.user) {
        res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
    } else {
        res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
});

export default router;
