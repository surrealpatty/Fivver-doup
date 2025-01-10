import express, { Request, Response, NextFunction } from 'express';
import { resetPassword } from '../controllers/passwordController';
import { validatePasswordReset } from '../middlewares/validatePasswordReset'; // Correct import

const router = express.Router();

// Define the middleware function with the correct signature
const validatePasswordReset: express.RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    // Middleware logic (e.g., validate password reset data)
    if (!req.body.token || !req.body.newPassword) {
        return res.status(400).json({ message: 'Token and new password are required.' });
    }

    // Otherwise, pass control to the next middleware or route handler
    next();
};

// Route for password reset
router.post('/reset', validatePasswordReset, resetPassword);

export default router;
