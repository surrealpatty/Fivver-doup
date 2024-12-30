import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Import the middleware
const router = Router();
// Protected route example
router.get('/protected', authenticateToken, // Use the authenticateToken middleware
async (req, // Ensure correct typing for `req` using CustomAuthRequest
res, next) => {
    try {
        // Ensure req.user is available, as it's injected by authenticateToken middleware
        if (!req.user) {
            // Return early if `user` is not present
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id, email, username } = req.user;
        // Return the protected route response with user data
        return res.status(200).json({
            message: 'Protected route accessed',
            user: { id, email, username }, // Optionally return user data
        });
    }
    catch (error) { // Explicitly type the error as 'any' or 'Error'
        // Return error response instead of calling next(error)
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
export default router;