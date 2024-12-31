import { Router } from 'express'; // Import required types
import { authenticateToken } from '../middlewares/authenticateToken'; // Middleware for token verification
const router = Router();
// Example middleware to check user roles
const checkRole = (role) => {
    return (req, res, next) => {
        const user = req.user; // Type the user as UserPayload
        const userRole = user.role; // Now TypeScript knows that user has a 'role' property
        if (userRole !== role) {
            return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
        }
        next();
    };
};
// Premium service route for paid users only
router.get('/premium', authenticateToken, checkRole('Paid'), (req, res) => {
    res.status(200).json({ message: 'Premium service access granted.' });
});
export default router;
//# sourceMappingURL=service.js.map