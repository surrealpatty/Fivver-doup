import express from 'express';
import { User } from '../models/user'; // Correct relative path to the User model
import { validateRegistration } from '../middlewares/validateRegistration'; // Correct relative path to the middleware
// Create a new router instance
const router = express.Router();
// Define the /register endpoint
router.post('/register', validateRegistration, async (req, res) => {
    const { email, username, password } = req.body;
    // Validate input fields
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
        // Create a new user with default values for additional fields
        const user = await User.create({
            email,
            username,
            password,
            role: 'user', // Default role
            tier: 'free', // Default tier
            isVerified: false, // Default verification status
        });
        return res.status(201).json(user); // Respond with the created user
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' }); // Handle unexpected errors
    }
});
// Export the router to be used in the main app
export default router;
//# sourceMappingURL=user.js.map