import express, { Request, Response, NextFunction } from 'express';
import { resetPassword } from '../controllers/passwordController';
import { validatePasswordReset as validatePasswordResetMiddleware } from '../middlewares/validatePasswordReset'; // Correct import

const router = express.Router();

// Middleware function for password reset validation
const validatePasswordReset: express.RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  // Middleware logic (e.g., validate password reset data)
  if (!req.body.token || !req.body.newPassword) {
    // Send response directly here, but the return type must be void
    res.status(400).json({ message: 'Token and new password are required.' });
    return; // Ensure we exit the middleware after sending the response
  }

  // If everything is good, call next()
  next();
};

// Route for password reset
router.post('/reset', validatePasswordReset, resetPassword);

export default router;
