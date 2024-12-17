import express from 'express';
import { resetPassword } from '../controllers/passwordController';
import { validatePasswordReset } from '../middlewares/validatePasswordReset';

const router = express.Router();

// Route for password reset
router.post('/reset', validatePasswordReset, resetPassword);

export default router;
