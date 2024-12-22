import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';  // Correct path for authenticateToken middleware
import { CustomAuthRequest } from '../types';  // Correct import for CustomAuthRequest
import { UserPayload } from '../types'; // Ensure that UserPayload is imported

const router = Router();

// Example protected route
router.get('/protected', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    try {
        // Ensure user is authenticated
        const user: UserPayload | undefined = req.user;  // Explicitly typing user as UserPayload or undefined

        // Handle the case where user is undefined (invalid or missing token)
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Access user data, ensuring fallbacks for undefined properties
        const { id, email = 'Email not provided', username = 'Username not provided', tier = 'Tier not provided', role = 'User' } = user;

        // Return response with user data
        return res.status(200).json({
            message: 'You have access to this protected route.',
            user: {
                id,
                email,
                username,
                tier,
                role
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
