// src/api.ts
import express, { Request, Response } from 'express';
import  User  from './models/user';  // Make sure to import User model

const router = express.Router();

// Create a new user
router.post('/users', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create the user
        const user = await User.create({ email, password });

        return res.status(201).json(user);  // Send the created user back in the response
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();  // Fetch all users
        return res.status(200).json(users);  // Return users in response
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const user = await User.findByPk(id);  // Find user by primary key
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);  // Return the found user
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a user's information
router.put('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password } = req.body;

    try {
        const user = await User.findByPk(id);  // Find user by ID
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user attributes
        user.email = email || user.email;
        user.password = password || user.password;
        await user.save();  // Save the updated user

        return res.status(200).json(user);  // Return the updated user
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a user
router.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);  // Find user by ID
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        await user.destroy();
        return res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;  // Export the router to be used in your server setup
