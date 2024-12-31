import { Router } from 'express';
import { User } from '../models/user'; // Correct relative path to the User model
import { validateRegistration } from '../middlewares/validateRegistration'; // Correct relative path to the middleware
const router = Router();
router.post('/register', validateRegistration, async (req, res) => {
    const { email, username, password } = req.body;
    // Check if all required fields are present
    if (!email) {
        return res.status(400).json({ errors: [{ msg: 'Email is required' }] });
    }
    if (!username) {
        return res.status(400).json({ errors: [{ msg: 'Username is required' }] });
    }
    if (!password) {
        return res.status(400).json({ errors: [{ msg: 'Password is required' }] });
    }
    try {
        // Include additional required fields like 'role', 'tier', and 'isVerified' when creating the user
        const user = await User.create({
            email,
            username,
            password,
            role: 'user', // Default role (could be 'admin' if needed)
            tier: 'free', // Default tier (could be 'paid' if needed)
            isVerified: false, // Default verification status
        });
        return res.status(201).json(user); // Respond with the created user
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' }); // Handle internal errors
    }
});
export default router;
